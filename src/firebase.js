import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDaOSNbX7DvAkxgi8w_bloCnKuqkhoOCTc",
  authDomain: "bigmart-21b7d.firebaseapp.com",
  databaseURL:
    "https://bigmart-21b7d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bigmart-21b7d",
  storageBucket: "bigmart-21b7d.appspot.com",
  messagingSenderId: "177816941149",
  appId: "1:177816941149:web:50a42b4c71877e38bc53b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(
  app,
  "https://bigmart-21b7d-default-rtdb.asia-southeast1.firebasedatabase.app"
);
export const storage = getStorage(app, "bigmart-21b7d.appspot.com");
