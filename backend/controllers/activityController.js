
const UserActivity = require('../models/userActivity');

exports.getUserActivities = async (req, res) => {
    try {
      // Fetch activities for the logged-in user
      const activities = await UserActivity.find({ userId: req.user._id }).sort({ timestamp: -1 });
      
      res.status(200).json(activities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };