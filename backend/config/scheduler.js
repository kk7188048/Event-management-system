const cron = require('node-cron');
const Event = require('../models/Event');
const sendEmail = require('./mailer');

// Schedule a cron job to run every day at 8 AM to send reminders
cron.schedule('0 8 * * *', async () => {
  try {
    const now = new Date();
    const upcomingEvents = await Event.find({
      date: { $gte: now, $lt: new Date(now.getTime() + 24 * 60 * 60 * 1000) }, // Events within the next 24 hours
      attendees: { $elemMatch: { rsvpStatus: 'confirmed' } },
    });

    upcomingEvents.forEach(event => {
      event.attendees.forEach(attendee => {
        if (attendee.rsvpStatus === 'confirmed') {
          const message = `Dear ${attendee.name},\nThis is a reminder for your upcoming event: ${event.title} on ${event.date} at ${event.venue}.`;
          sendEmail(attendee.email, `Reminder for ${event.title}`, message);
        }
      });
    });
  } catch (err) {
    console.error('Error sending reminders:', err);
  }
});
