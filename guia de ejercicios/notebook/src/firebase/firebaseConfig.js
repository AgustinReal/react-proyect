// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20NvQbetMLXjjU1d1upDwutH3rQ_R9Og",
  authDomain: "appchat-b0837.firebaseapp.com",
  projectId: "appchat-b0837",
  storageBucket: "appchat-b0837.appspot.com",
  messagingSenderId: "735254152802",
  appId: "1:735254152802:web:7881ee6618005fd2b5f33b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

