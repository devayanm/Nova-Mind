// models/goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
