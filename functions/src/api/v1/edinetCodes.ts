import express from "express";
import * as functions from "firebase-functions";
import { EdinetCode, RawEdinetCode } from "common";
import EdinetcodeDlInfo from "./EdinetcodeDlInfo.json" assert { type: "json" };

const app = express();
app.get("/", (req, res) => {
  const edinetCodes = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
    (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  res
    .status(200)
    .send(edinetCodes.filter((edinetCode) => edinetCode.listed === "上場"));
});
app.get("/:fundCode", (req, res) => {
  const edinetCodes = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
    (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  const fundCode = String(
    req.params.fundCode.length === 4
      ? req.params.fundCode + "0"
      : req.params.fundCode
  );
  const edinetCode = edinetCodes.filter(
    (edinetCode) => edinetCode.fund_code === fundCode
  );
  res.status(200).send(edinetCode);
});
export const edinetCodes = functions
  .region("asia-northeast1")
  .https.onRequest(app);
