// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7uiIivuVYWrQXyOilFh6-4kTGFr3nHHU",
  authDomain: "blogspot-deba018.firebaseapp.com",
  projectId: "blogspot-deba018",
  storageBucket: "blogspot-deba018.firebasestorage.app",
  messagingSenderId: "131659673977",
  appId: "1:131659673977:web:067efb61db9a2ca6277fa8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// init the auth
export const auth = getAuth(app);

// initialize the provider
export const Provider = new GoogleAuthProvider();
