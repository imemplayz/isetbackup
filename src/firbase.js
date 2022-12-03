import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVuElh4vuzDJX19NZkhNgGuJZFWoW0iJ0",
  authDomain: "iset-c47c6.firebaseapp.com",
  projectId: "iset-c47c6",
  storageBucket: "iset-c47c6.appspot.com",
  messagingSenderId: "225220634688",
  appId: "1:225220634688:web:6a9ad13139bc98cc2f57a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
