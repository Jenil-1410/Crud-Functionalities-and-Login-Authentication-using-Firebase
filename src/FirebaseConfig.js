import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAF9z9RbkT3ezcaMn9ohYugixcjx3wpDcI",
  authDomain: "crud-2c8ab.firebaseapp.com",
  projectId: "crud-2c8ab",
  storageBucket: "crud-2c8ab.appspot.com",
  messagingSenderId: "635278718499",
  appId: "1:635278718499:web:422da19571c5c690772396",
  measurementId: "G-WWEEX4Z1KF"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
export const db = getFirestore(app);