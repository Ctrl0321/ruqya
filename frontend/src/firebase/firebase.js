// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY4Ax0YY_WQvNlAoR86dROW9CRdNhb1cc",
  authDomain: "ruqya-cc940.firebaseapp.com",
  projectId: "ruqya-cc940",
  storageBucket: "ruqya-cc940.firebasestorage.app",
  messagingSenderId: "187995260641",
  appId: "1:187995260641:web:e6059bcb4f42665c88d9a0",
  measurementId: "G-RYN1E41M37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {auth, app, analytics};