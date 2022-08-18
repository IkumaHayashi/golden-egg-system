import { Company } from "../api/company.js";
export class CompanyService {
    static generate(edinetCode, quote) {
        // 配当利回りを計算
        const dividendYield = quote?.regularMarketPrice && quote?.regularMarketPrice
            ? (quote?.trailingAnnualDividendRate / quote?.regularMarketPrice) *
                100
            : undefined;
        // %換算と少数第二位で切り捨て
        const dividendYieldPercent = dividendYield !== undefined
            ? parseFloat(dividendYield?.toFixed(2))
            : undefined;
        return new Company(edinetCode.edinet_code, edinetCode.kind, edinetCode.listed, edinetCode.consolidated, edinetCode.capital, edinetCode.settlement_date, edinetCode.name, edinetCode.name_alphabet, edinetCode.name_phonetic, edinetCode.address, edinetCode.type_of_industry, edinetCode.fund_code, edinetCode.corporate_code, quote?.regularMarketPrice, quote?.currency, quote?.trailingAnnualDividendRate, dividendYieldPercent);
    }
}
