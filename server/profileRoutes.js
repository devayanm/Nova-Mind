const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.get('/', async (req, res) => {
    const userId = req.user.uid;

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            name: user.name,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            bloodGroup: user.bloodGroup,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update', async (req, res) => {
    const userId = req.user.uid;
    const { name, phoneNumber, dateOfBirth, bloodGroup } = req.body;

    try {
        let user = await User.findOne({ userId });

        if (!user) {
            user = new User({ userId });
        }

        user.name = name;
        user.phoneNumber = phoneNumber;
        user.dateOfBirth = dateOfBirth;
        user.bloodGroup = bloodGroup;

        await user.save();

        res.json({
            user: {
                name: user.name,
                phoneNumber: user.phoneNumber,
                dateOfBirth: user.dateOfBirth,
                bloodGroup: user.bloodGroup,
            },
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
