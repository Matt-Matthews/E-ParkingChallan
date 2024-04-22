// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfG0aacAw3Pwtqgvt-TVyjrqMP_HswB8A",
  authDomain: "portfolio-e3cc6.firebaseapp.com",
  projectId: "portfolio-e3cc6",
  storageBucket: "portfolio-e3cc6.appspot.com",
  messagingSenderId: "310683576874",
  appId: "1:310683576874:web:749e25aa90d62268363153",
  measurementId: "G-WHK95EDW95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {
  storage
}