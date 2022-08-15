import express from "express";
import * as functions from "firebase-functions";

const app = express();

import { companies } from "./routes/v1/companies.js";
app.use("/v1/companies", companies);
const api = functions.region("asia-northeast1").https.onRequest(app);

export { api };
