import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { addPantry } from './api/Pantry';

// Initialize Firebase
const env = process.env;
firebase.initializeApp({
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID,
});

// Auth providers
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider=  new firebase.auth.FacebookAuthProvider();
const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');

// Sends request to create pantry for new users
// Does nothing if user already exists in database
export const sendPantryCreationRequest = () => {
  console.log(auth);
  let body = {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  };
  addPantry(body);
}

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then(sendPantryCreationRequest);
};

export const signInWithFacebook = () => {
  auth.signInWithPopup(facebookProvider).then(sendPantryCreationRequest);
}

export const signInWithYahoo = () => {
  auth.signInWithPopup(yahooProvider).then( (result) => {
    console.log(result);
    sendPantryCreationRequest();
  });
}

// Database
export const db = firebase.firestore();
