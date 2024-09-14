const Event = require('../models/Event');
const sendEmail = require('../config/mailer');
const crypto = require('crypto');
const UserActivity = require('../models/userActivity');


// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Log user activity for viewing events
    await logUserActivity(req.user._id, 'Viewed all events', null);

    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create an event
exports.createEvent = async (req, res) => {
  const { title, description, date, venue, attendees } = req.body;

  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      venue,
      organizerId: req.user._id,
      attendees,
    });

    // Send confirmation emails to attendees
    attendees.forEach((attendee) => {
      const confirmationToken = crypto.randomBytes(32).toString('hex');
      attendee.confirmationToken = confirmationToken;

      // Save the confirmation token to the event
      Event.findByIdAndUpdate(newEvent._id, {
        $set: { 'attendees.$[elem].confirmationToken': confirmationToken },
      }, {
        arrayFilters: [{ 'elem.email': attendee.email }],
        new: true,
      }).exec();

      // Send email with the confirmation link
      const confirmationLink = `${process.env.BASE_URL}/api/events/confirm-rsvp/${newEvent._id}/${confirmationToken}`;
      const message = `Dear ${attendee.name},\nPlease confirm your RSVP by clicking the following link: ${confirmationLink}`;
      sendEmail(attendee.email, 'RSVP Confirmation', message);
    });

    // Log user activity for creating an event
    // Log activity
    await UserActivity.create({
      userId: req.user._id,
      action: 'create_event',
      details: `Created event: ${title}`,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Confirm RSVP
exports.confirmRsvp = async (req, res) => {
  const { eventId, token } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const attendee = event.attendees.find(a => a.confirmationToken === token);
    if (!attendee) {
      return res.status(400).json({ message: 'Invalid or expired confirmation token' });
    }

    attendee.rsvpStatus = 'confirmed';
    attendee.confirmationToken = null; // Clear the token after confirmation

    await event.save();

    // Log activity
    await UserActivity.create({
      userId: req.user._id, // Assuming req.user is available
      action: 'confirm_rsvp',
      details: `RSVP confirmed for ${attendee.email} for event: ${event.title}`,
    });

    res.status(200).json({ message: 'RSVP confirmed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send reminder to all attendees
exports.sendReminder = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Send email to each confirmed attendee
    event.attendees.forEach((attendee) => {
      if (attendee.rsvpStatus === 'confirmed') {
        const message = `Dear ${attendee.name},\nThis is a reminder for your upcoming event: ${event.title} on ${event.date} at ${event.venue}.`;
        sendEmail(attendee.email, `Reminder for ${event.title}`, message);
      }
    });

    // Log user activity for sending reminder
    await logUserActivity(req.user._id, `Sent reminders for event: ${event.title}`, event._id);

    res.status(200).json({ message: 'Reminder emails sent to all confirmed attendees' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
