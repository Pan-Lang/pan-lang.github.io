import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig.json';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};