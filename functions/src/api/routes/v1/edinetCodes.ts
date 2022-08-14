import {EdinetCode, RawEdinetCode} from "common";
import EdinetcodeDlInfo from "./EdinetcodeDlInfo.json" assert { type: "json" };
import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
router.get("/", (req, res) => {
  const edinetCodes = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
      (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  res
      .status(200)
      .json(edinetCodes.filter((edinetCode) => edinetCode.listed === "上場"));
});
router.get("/:fundCode", (req, res) => {
  const edinetCodes = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
      (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  const fundCode = String(
    req.params.fundCode.length === 4 ?
      req.params.fundCode + "0" :
      req.params.fundCode
  );
  const edinetCode = edinetCodes.filter(
      (edinetCode) => edinetCode.fund_code === fundCode
  );
  res.status(200).json(edinetCode);
});
export const edinetCodes = router;
