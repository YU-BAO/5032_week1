// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDiqDdiCphZQiNiNIZooGG-csE_cLD1yS8",
  authDomain: "efolio-b357a.firebaseapp.com",
  projectId: "efolio-b357a",
  storageBucket: "efolio-b357a.firebasestorage.app",
  messagingSenderId: "103354989594",
  appId: "1:103354989594:web:200af47c364e3f4a901bd8",
  measurementId: "G-J7T9PF0YRZ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app 