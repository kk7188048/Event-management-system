const express = require('express');
const {
  createEvent,
  getEvents,
  confirmRsvp,
  sendReminder,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);
router.get('/confirm-rsvp/:eventId/:token', confirmRsvp); // RSVP confirmation route
router.post('/reminder/:eventId', authMiddleware, sendReminder);

module.exports = router;
