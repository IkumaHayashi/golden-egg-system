import { initializeApp } from "firebase-admin/app";
initializeApp();
console.log("done initializeApp");
import api from "./api/index.js";
export { api };
