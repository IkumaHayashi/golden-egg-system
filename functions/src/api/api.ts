import express from "express";
import * as functions from "firebase-functions";

const app = express();

import { edinetCodes } from "./routes/v1/edinetCodes.js";
app.use("/v1/edinetCodes", edinetCodes);
const api = functions.region("asia-northeast1").https.onRequest(app);

export { api };
