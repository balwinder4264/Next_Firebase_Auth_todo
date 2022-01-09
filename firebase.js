// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9ZNG2v3Wzp1h_ogbNNHEyQhuQS4qN9TM",
    authDomain: "authentication-240a3.firebaseapp.com",
    databaseURL: "https://authentication-240a3-default-rtdb.firebaseio.com",
    projectId: "authentication-240a3",
    storageBucket: "authentication-240a3.appspot.com",
    messagingSenderId: "1012613020124",
    appId: "1:1012613020124:web:1f9d5a40060696b80eb719",
    measurementId: "G-5F9YQ9KE3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider()
export { db, auth, provider };