import { initializeApp } from "firebase-admin/app";
initializeApp();

import pubsub from "./pubsub/index";
export { pubsub };
