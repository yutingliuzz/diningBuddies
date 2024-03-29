// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvR9EYsjcHeS9GvibUtwhs87rFC7KIHq4",
  authDomain: "diningbuddies.firebaseapp.com",
  projectId: "diningbuddies",
  storageBucket: "diningbuddies.appspot.com",
  messagingSenderId: "718666198249",
  appId: "1:718666198249:web:cb7484500580892f315478",
  measurementId: "G-WH35YC5VLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
