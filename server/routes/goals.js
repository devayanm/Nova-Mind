// routes/goals.js
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

// Create a goal
router.post('/', goalController.createGoal);

// Read all goals
router.get('/', goalController.getAllGoals);

// Update a goal
router.put('/:goalId', goalController.updateGoal);

// Delete a goal
router.delete('/:goalId', goalController.deleteGoal);

module.exports = router;
