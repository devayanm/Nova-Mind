// app.js (or wherever your main app file is)
const express = require('express');
const mongoose = require('mongoose');
const goalRoutes = require('./routes/goals');

const app = express();

// ... (other middleware and configurations)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use goal routes
app.use('/api/goals', goalRoutes);

// ... (other routes and configurations)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
