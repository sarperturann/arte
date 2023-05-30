// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZy_qLilV2whSZcAo8NBUM-FbUpATBTws",
  authDomain: "arte-386819.firebaseapp.com",
  projectId: "arte-386819",
  storageBucket: "arte-386819.appspot.com",
  messagingSenderId: "299948623179",
  appId: "1:299948623179:web:1be99072da8eeafa3c14ce",
  measurementId: "G-C5WP111QHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);