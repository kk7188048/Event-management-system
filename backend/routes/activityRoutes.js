const express = require('express');
const router = express.Router();
const getUserActivities = require('../controllers/activityController').getUserActivities;
// Route to get all user activity logs
const authMiddleware = require('../middleware/authMiddleware');

// Route to fetch user activity logs
router.get('/activities', authMiddleware, getUserActivities);
module.exports = router;
