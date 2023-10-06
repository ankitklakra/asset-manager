import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyArI5CHY_UWfZ5bCKvqgDhi5Ylo_Q_fr2Y",
  authDomain: "studysharenit.firebaseapp.com",
  projectId: "studysharenit",
  storageBucket: "studysharenit.appspot.com",
  messagingSenderId: "407135811812",
  appId: "1:407135811812:web:85915bd9b15b7f8471d4f1",
  measurementId: "G-04JCDKS9BL"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}