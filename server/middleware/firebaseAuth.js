// server/middleware/firebaseAuth.js

const admin = require('firebase-admin');

// Middleware to verify the Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // attach user data to request
    next(); // proceed to actual route
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyFirebaseToken;
