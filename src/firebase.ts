// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "kaiber-upload-video.firebaseapp.com",
  projectId: "kaiber-upload-video",
  storageBucket: "kaiber-upload-video.appspot.com",
  messagingSenderId: "788658960989",
  appId: "1:788658960989:web:b9d3168a16a1ad4909abb4",
};

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);

export default firebasApp;
