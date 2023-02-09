// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzYW9gkAFIXdbVDRjugbzAHYRBW1ZVIrI",
  authDomain: "react-firebase-76b62.firebaseapp.com",
  projectId: "react-firebase-76b62",
  storageBucket: "react-firebase-76b62.appspot.com",
  messagingSenderId: "879363216987",
  appId: "1:879363216987:web:ae479a96c2fca637be517e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
