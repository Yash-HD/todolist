// server/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json'); // 👈 Your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
