import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json';
import { addPantry } from './api/Pantry';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(() => {
    console.log(auth);
    let body = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      name: auth.currentUser.displayName
    }
    addPantry(body);
  })
  
};

export const db = firebase.firestore();