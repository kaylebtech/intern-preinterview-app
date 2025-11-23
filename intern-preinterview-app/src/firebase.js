
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjUCN4cfJzxspl4lTxoa3zJ9MqmnkQNDw",
  authDomain: "koinsave-1d64b.firebaseapp.com",
  projectId: "koinsave-1d64b",
  storageBucket: "koinsave-1d64b.firebasestorage.app",
  messagingSenderId: "460154634488",
  appId: "1:460154634488:web:546927b0a6ea3f7870bb0d",
  measurementId: "G-MFNMJJYYK1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)