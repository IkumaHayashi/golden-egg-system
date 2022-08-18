import { EdinetCode, RawEdinetCode, ICompany, CompanyService } from "common";
import EdinetcodeDlInfo from "./EdinetcodeDlInfo.json" assert { type: "json" };
import express from "express";
import yahooFinance from "yahoo-finance2";

// eslint-disable-next-line new-cap
const router = express.Router();
router.get("/", (req, res) => {
  const companies = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
    (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  res
    .status(200)
    .json(companies.filter((edinetCode) => edinetCode.listed === "上場"));
});
router.post("/search", async (req, res) => {
  const fundCodes = (req.body.codes as string).split(",") ?? [];
  const companies = (EdinetcodeDlInfo as Array<RawEdinetCode>)
    .map((rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode))
    .filter((edinetCode) =>
      fundCodes.some((fundCode) => fundCode + "0" === edinetCode.fund_code)
    );
  const quotes = await yahooFinance.quote(
    fundCodes.map((fundCode) => fundCode + ".T")
  );

  const responses: Array<ICompany> = companies.map((company) => {
    const quote = quotes.find(
      (rawQuote) => rawQuote.symbol.substring(0, 4) + "0" === company.fund_code
    );
    return CompanyService.generate(company, quote);
  });
  res.status(201).json(responses);
});
router.get("/:fundCode", async (req, res) => {
  const companies = (EdinetcodeDlInfo as Array<RawEdinetCode>).map(
    (rawEdinetCode) => EdinetCode.fromJson(rawEdinetCode)
  );
  const fundCode = String(
    req.params.fundCode.length === 4
      ? req.params.fundCode + "0"
      : req.params.fundCode
  );
  const fundCode4 = fundCode.substring(0, 4);
  const quote = await yahooFinance.quote(fundCode4 + ".T");
  const edinetCode = companies.filter(
    (edinetCode) => edinetCode.fund_code === fundCode
  )[0];
  const response = CompanyService.generate(edinetCode, quote);
  res.status(200).json(response);
});

export const companies = router;
