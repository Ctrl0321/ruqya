var admin = require("firebase-admin");

var serviceAccount = require("./auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const verifyToken = async (tokenId: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default admin;