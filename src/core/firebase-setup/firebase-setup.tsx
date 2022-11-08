import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCkpTPxRnBj-of3L1WMjwzbT8TJKkdvjG4",
  authDomain: "capms-a5695.firebaseapp.com",
  projectId: "capms-a5695",
  storageBucket: "capms-a5695.appspot.com",
  messagingSenderId: "196181087175",
  appId: "1:196181087175:web:c2d03ff34291269b837fe2"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
// INIT AUTHENTICATION
const auth = getAuth(app);
// INIT DATABASE
const db = getFirestore(app);
// INIT STORAGE
const storage = getStorage(app);

export { auth, db, storage };