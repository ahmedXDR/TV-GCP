// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRbNr1GMNaJf2yhXpNWkSbuOlK7y4JfDc",
  authDomain: "tv-gcp.firebaseapp.com",
  projectId: "tv-gcp",
  storageBucket: "tv-gcp.appspot.com",
  messagingSenderId: "32006017539",
  appId: "1:32006017539:web:48651a760af103b1103436",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
