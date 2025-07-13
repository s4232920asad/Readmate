import { initializeApp, getApps, getApp } from "firebase/app"; // Import getApps and getApp
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuTteYeIw-s0agWF9v30Phhy493gxLmWo",
  authDomain: "read-mate-f564b.firebaseapp.com",
  projectId: "read-mate-f564b",
  storageBucket: "read-mate-f564b.firebasestorage.app",
  messagingSenderId: "985046370140",
  appId: "1:985046370140:web:8b853ddcabb7070fe76399",
  measurementId: "G-CVY3QV8N2Q",
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db }; 
