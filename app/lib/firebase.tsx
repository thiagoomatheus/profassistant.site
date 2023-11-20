import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Initialize Firebase
export const firebase = initializeApp({
  apiKey: "AIzaSyAoZIL-V9UwOU_QRfdTQECHhX1PIMHuv5E",
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
});

const auth = getAuth(firebase)
const provider = new GoogleAuthProvider()

export { auth, provider}