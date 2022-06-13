import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDs7lGjiBjmZaJshAhJRgXbE0ubObGtx_s",
  authDomain: "dev-golden-egg.firebaseapp.com",
  projectId: "dev-golden-egg",
  storageBucket: "dev-golden-egg.appspot.com",
  messagingSenderId: "662187848513",
  appId: "1:662187848513:web:1f5360e4ef1d8cd7a9a7c0",
  measurementId: "G-JDZSTC5K87",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
if (location.host.startsWith("localhost")) {
  connectFirestoreEmulator(db, "localhost", 8080);
}
export { app as firebase, db };
