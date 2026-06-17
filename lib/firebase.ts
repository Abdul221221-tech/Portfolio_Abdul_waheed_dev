import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA9DVB7KdWOvrXBGTLBGL_exVWDyQ6_DQE",
    authDomain: "abdulwaheed-5da49.firebaseapp.com",
    databaseURL: "https://abdulwaheed-5da49-default-rtdb.firebaseio.com",
    projectId: "abdulwaheed-5da49",
    storageBucket: "abdulwaheed-5da49.firebasestorage.app",
    messagingSenderId: "155314840587",
    appId: "1:155314840587:web:b91861a60780fa4af9130e",
    measurementId: "G-2SV0W3NE5X"
};

// Initialize Firebase only if it hasn't been initialized already to prevent errors during Next.js HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
