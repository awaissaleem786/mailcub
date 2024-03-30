// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdjipkEeF1hvA30wc20mkuOqXltrV-SJk",
  authDomain: "customer-curd.firebaseapp.com",
  projectId: "customer-curd",
  storageBucket: "customer-curd.appspot.com",
  messagingSenderId: "376117451374",
  appId: "1:376117451374:web:24ef16a91bddd04308247f",
  measurementId: "G-Q6K238GGK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

