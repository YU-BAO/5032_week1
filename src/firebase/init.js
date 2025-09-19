// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiqDdiCphZQiNiNIZooGG-csE_cLD1yS8",
  authDomain: "efolio-b357a.firebaseapp.com",
  projectId: "efolio-b357a",
  storageBucket: "efolio-b357a.firebasestorage.app",
  messagingSenderId: "103354989594",
  appId: "1:103354989594:web:200af47c364e3f4a901bd8",
  measurementId: "G-J7T9PF0YRZ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db 