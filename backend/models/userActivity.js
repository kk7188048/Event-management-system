// models/UserActivity.js

const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who performed the action
  action: { type: String, required: true },                                      // Action name (e.g., 'create_event', 'confirm_rsvp')
  timestamp: { type: Date, default: Date.now },                                  // When the action occurred
  details: { type: String, required: true },                                     // Additional details (e.g., event name or attendee email)
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
