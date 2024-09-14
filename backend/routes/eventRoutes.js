const express = require('express');
const {
  createEvent,
  getEvents,
  confirmRsvp,
  sendReminder,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authmiddleware')
const eventController = require('../controllers/eventController');
const router = express.Router();

// Existing routes...

// Route to get all attendees for a specific event
router.get('/:eventId', authMiddleware, eventController.getAttendees);

// Route to delete an attendee from a specific event
router.delete('/:eventId/:email', authMiddleware, eventController.deleteAttendee);

router.post('/:eventId/add-attendee', eventController.addAttendee);

router.post('/create', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);
router.get('/confirm-rsvp/:eventId/:token', confirmRsvp); // RSVP confirmation route
router.post('/reminder/:eventId', authMiddleware, sendReminder);

module.exports = router;
