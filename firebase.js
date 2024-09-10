// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkY8mag2oxU3aKV1OpvV0Nc_lB9kmpGjg",
  authDomain: "ai-flashcards-7bbca.firebaseapp.com",
  projectId: "ai-flashcards-7bbca",
  storageBucket: "ai-flashcards-7bbca.appspot.com",
  messagingSenderId: "937082801627",
  appId: "1:937082801627:web:e8a06adc88eb9127caebfe",
  measurementId: "G-YXEJP54SC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}