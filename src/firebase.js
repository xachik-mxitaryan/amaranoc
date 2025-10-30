import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVF9xGIj9tV9XWW4zpNUOYOGZXeHh8O6k",
  authDomain: "amaranoc-f7e26.firebaseapp.com",
  projectId: "amaranoc-f7e26",
  storageBucket: "amaranoc-f7e26.firebasestorage.app",
  messagingSenderId: "158700341874",
  appId: "1:158700341874:web:0023a1cea02f9cf3e9d0eb",
  measurementId: "G-4Y1MJEYCVH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
