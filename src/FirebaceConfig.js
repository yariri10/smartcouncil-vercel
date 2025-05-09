import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkcGnpB3FKJcTUkG9OAiTgH1W3osGRSfY",
    authDomain: "smartcouncil-a8d6c.firebaseapp.com",
    projectId: "smartcouncil-a8d6c",
    storageBucket: "smartcouncil-a8d6c.firebasestorage.app",
    messagingSenderId: "1013978394189",
    appId: "1:1013978394189:web:ff26e7eb84a2e325f53604",
    measurementId: "G-SV62CLWLRQ"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export{auth, googleProvider, db};