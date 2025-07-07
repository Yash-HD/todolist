import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdgeQJhoTPdPwxre32yH6ePtB5mohxCQA",
  authDomain: "to-do-list-yhd.firebaseapp.com",
  projectId: "to-do-list-yhd",
  storageBucket: "to-do-list-yhd.firebasestorage.app",
  messagingSenderId: "453964586086",
  appId: "1:453964586086:web:2f5233a6f483697bd021a7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);