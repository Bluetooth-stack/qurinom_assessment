// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyUH0e1Aob647CQ-3sAd3uIspuT753gq0",
  authDomain: "cards0-46031.firebaseapp.com",
  projectId: "cards0-46031",
  storageBucket: "cards0-46031.appspot.com",
  messagingSenderId: "1076670255446",
  appId: "1:1076670255446:web:145bc133e0ae840ae706f7",
  measurementId: "G-6L94749RE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};