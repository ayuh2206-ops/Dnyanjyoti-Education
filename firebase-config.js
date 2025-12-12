// Import Firebase from CDN (No npm install needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
// REPLACE THESE WITH YOUR REAL KEYS FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyD1hJ4WPm3vTUuNvU4O7MJDfTpbq_SH29U",
  authDomain: "dnyanjyoti-landing-page.firebaseapp.com",
  projectId: "dnyanjyoti-landing-page",
  storageBucket: "dnyanjyoti-landing-page.firebasestorage.app",
  messagingSenderId: "1084755815698",
  appId: "1:1084755815698:web:ae3ab3aa88b573fd9ad7cb",
  measurementId: "G-TVV6GL1DR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };