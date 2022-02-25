// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCt3sUGHubNFhwgTG3xhGobB7ShI0a_BhU",
    authDomain: "grand-lamp-238515.firebaseapp.com",
    databaseURL: "https://grand-lamp-238515.firebaseio.com",
    projectId: "grand-lamp-238515",
    storageBucket: "grand-lamp-238515.appspot.com",
    messagingSenderId: "258505939230",
    appId: "1:258505939230:web:f35457e1fb0b9cb17b110f",
    measurementId: "G-21H46EDYSE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();

// export const firestore = firebase.firestore()
// export const storage = firebase.storage()

// firebase login
// firebase init
// firebase deploy