import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7X0FT_H8N2uQyIzSn9HdC1prYfg1WiQ8",
  authDomain: "nexiv-8c4d6.firebaseapp.com",
  projectId: "nexiv-8c4d6",
  storageBucket: "nexiv-8c4d6.firebasestorage.app",
  messagingSenderId: "700784578377",
  appId: "1:700784578377:web:af02c0affc669255459498",
  measurementId: "G-8H324MB4ND"
};

// Initialize Firebase - prevent multiple initializations in dev HMR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Secure Analytics initialization for Server-Side Rendering environment
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, auth, db, analytics };
