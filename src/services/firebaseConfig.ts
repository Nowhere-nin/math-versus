import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAvLQL0qMMO3vXLytVzcrmcNbU-UULqfLE",
  authDomain: "math-versus.firebaseapp.com",
  projectId: "math-versus",
  storageBucket: "math-versus.firebasestorage.app",
  messagingSenderId: "360407601072",
  appId: "1:360407601072:web:527cfa418cae36bd3b5075",
  measurementId: "G-TDPERQNNRR"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);