import firebase from "firebase/compat/app";  // include the Firebase module
import "firebase/compat/firestore"; // access firestore database service

const firebaseConfig = {
  apiKey: process.env.REACT_APP_HACK_IDEAS_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_HACK_IDEAS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_HACK_IDEAS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_HACK_IDEAS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_HACK_IDEAS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_HACK_IDEAS_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export default app;