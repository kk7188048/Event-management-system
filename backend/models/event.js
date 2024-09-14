const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Added email field
  rsvpStatus: { type: String, enum: ['pending', 'confirmed', 'declined'], default: 'pending' }, // Updated RSVP status
  confirmationToken: { type: String, default: null },           // Token for RSVP confirmation
  notified: { type: Boolean, default: false },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [attendeeSchema], // Attendee email addresses will be stored here
  rsvpLimit: { type: Number, default: 100 },
});

module.exports = mongoose.model('Event', eventSchema);
