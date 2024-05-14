import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import conf from "./conf/conf";

const firebaseConfig = {
  apiKey: conf.firebaseApikey,
  authDomain: conf.firebaseAuthdomain,
  projectId: conf.firebaseProjectId,
  storageBucket: conf.firebaseStoragebucket,
  messagingSenderId: conf.firebaseMessagingsenderId,
  appId: conf.firebaseAppId,
  measurementId: conf.firebaseMeasurementId
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
export const db = getFirestore(app);