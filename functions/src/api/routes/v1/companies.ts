import { EdinetCode, RawEdinetCode, ICompanyResponse } from "common";
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

  const responses: Array<ICompanyResponse> = companies.map((company) => {
    const quote = quotes.find(
      (rawQuote) => rawQuote.symbol.substring(0, 4) + "0" === company.fund_code
    );
    return {
      ...company,
      price: quote?.regularMarketPrice,
      currency: quote?.currency,
    };
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
  const result = await yahooFinance.quote(fundCode4 + ".T");
  const edinetCode = companies.filter(
    (edinetCode) => edinetCode.fund_code === fundCode
  )[0];
  const response: ICompanyResponse = {
    ...edinetCode,
    price: result.regularMarketPrice,
    currency: result.currency,
  };
  res.status(200).json(response);
});

export const companies = router;
