// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXShLaAv40Qp5LAGiO6CtNMWgKpezUeKA",
    authDomain: "ecoconnect-cc94f.firebaseapp.com",
    projectId: "ecoconnect-cc94f",
    storageBucket: "ecoconnect-cc94f.appspot.com",
    messagingSenderId: "956798983988",
    appId: "1:956798983988:web:e7f03008da064e6758cf61",
    measurementId: "G-19WZEH4ZCP"
  };
// ✅ Initialize app first
const app = initializeApp(firebaseConfig);

// ✅ THEN initialize services using `app`
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };