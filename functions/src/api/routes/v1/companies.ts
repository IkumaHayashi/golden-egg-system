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
    const dividendYield =
      quote?.regularMarketPrice && quote?.regularMarketPrice
        ? (quote?.trailingAnnualDividendRate! / quote?.regularMarketPrice!) *
          100
        : undefined;
    return {
      ...company,
      price: quote?.regularMarketPrice,
      currency: quote?.currency,
      dividend: quote?.trailingAnnualDividendRate,
      dividend_yield:
        dividendYield !== undefined
          ? parseFloat(dividendYield?.toFixed(2))
          : undefined,
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
  const quote = await yahooFinance.quote(fundCode4 + ".T");
  const edinetCode = companies.filter(
    (edinetCode) => edinetCode.fund_code === fundCode
  )[0];
  const dividendYield =
    quote?.regularMarketPrice && quote?.regularMarketPrice
      ? (quote?.trailingAnnualDividendRate! / quote?.regularMarketPrice!) * 100
      : undefined;
  const response: ICompanyResponse = {
    ...edinetCode,
    price: quote.regularMarketPrice,
    currency: quote.currency,
    dividend: quote.trailingAnnualDividendRate,
    dividend_yield:
      dividendYield !== undefined
        ? parseFloat(dividendYield?.toFixed(2))
        : undefined,
  };
  res.status(200).json(response);
});

export const companies = router;
