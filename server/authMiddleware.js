const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-sdk/nova-mind-d82e3-firebase-adminsdk-z7zwg-9f1f219141.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const authMiddleware = async (req, res, next) => {
    console.log('Received ID Token:', req.headers.authorization);
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized - Missing Authorization Header' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return res.status(401).json({ error: 'Unauthorized - Invalid Authorization Token' });
    }
};

module.exports = authMiddleware;
