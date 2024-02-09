// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvhtSXYR6_JpiTx3d_FUK9KgQSylMcyVI",
    authDomain: "habitatfinderdb.firebaseapp.com",
    projectId: "habitatfinderdb",
    storageBucket: "habitatfinderdb.appspot.com",
    messagingSenderId: "891336813752",
    appId: "1:891336813752:web:70e333908296de8c2ad84d",
    measurementId: "G-MXRMZDP4NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
