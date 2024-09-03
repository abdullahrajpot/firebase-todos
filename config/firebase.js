// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZAo4L08tH5wrbKXDB3tydlz_tnF0oavo",
  authDomain: "react-firebase10.firebaseapp.com",
  projectId: "react-firebase10",
  storageBucket: "react-firebase10.appspot.com",
  messagingSenderId: "552481206581",
  appId: "1:552481206581:web:39b065a78442c6add41c7c",
  measurementId:"G-578H20WWGR"
};







// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {analytics, auth , firestore}