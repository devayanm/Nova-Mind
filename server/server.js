const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./authMiddleware');
const profileRoutes = require('./profileRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(authMiddleware);

mongoose.connect('mongodb+srv://devayan_novamind:devayan_novamind12@cluster0.lhuhda9.mongodb.net/novamind?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/profile', profileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
