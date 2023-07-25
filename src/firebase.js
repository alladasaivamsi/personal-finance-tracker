// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdc7MFbp0ny9SGHm_F-al7w2z6WxP9nyk",
  authDomain: "personal-finance-tracker-5d4cd.firebaseapp.com",
  projectId: "personal-finance-tracker-5d4cd",
  storageBucket: "personal-finance-tracker-5d4cd.appspot.com",
  messagingSenderId: "616073754130",
  appId: "1:616073754130:web:631d0836e49ac7d3c68acb",
  measurementId: "G-G0VJ1NYEY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
