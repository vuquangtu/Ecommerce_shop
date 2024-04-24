// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBytChehKSQD90sBE_gK55F84pHqK29QFc",
  authDomain: "shop-cart-4d475.firebaseapp.com",
  projectId: "shop-cart-4d475",
  storageBucket: "shop-cart-4d475.appspot.com",
  messagingSenderId: "566430096103",
  appId: "1:566430096103:web:d22544389e6dc4becca042",
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage };

export default app;
