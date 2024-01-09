// controllers/goalController.js
const Goal = require('../models/goal');

exports.createGoal = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user._id; // Assuming you're using authentication and user is stored in req.user

        const newGoal = await Goal.create({ description, userId });

        res.status(201).json({ goal: newGoal });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create goal', error: error.message });
    }
};

exports.getAllGoals = async (req, res) => {
    try {
        const userId = req.user._id;
        const goals = await Goal.find({ userId });

        res.status(200).json({ goals });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch goals', error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goalId = req.params.goalId;
        const { description } = req.body;

        const updatedGoal = await Goal.findByIdAndUpdate(goalId, { description }, { new: true });

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ goal: updatedGoal });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update goal', error: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.goalId;

        const deletedGoal = await Goal.findByIdAndDelete(goalId);

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete goal', error: error.message });
    }
};
