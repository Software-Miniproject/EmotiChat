// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA5o2LhFUf5hBjA0pHgmxkjIhXycs-h64",
  authDomain: "emotichat-4a64f.firebaseapp.com",
  projectId: "emotichat-4a64f",
  storageBucket: "emotichat-4a64f.appspot.com",
  messagingSenderId: "596200760817",
  appId: "1:596200760817:web:4ad33dd248f0c8a9881050",
  measurementId: "G-GDZ3R1X1X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize requirements for using Google for authentication
const auth_provider = new GoogleAuthProvider()
export const google_signin = () => {
  signInWithPopup(auth, auth_provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
}

export const firestore = getFirestore(app);