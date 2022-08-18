import { EdinetCode } from "../firestore/models/edinetCode.js";
import { Company } from "../api/company.js";
import { Quote } from "../../../functions/node_modules/yahoo-finance2/dist/esm/src/modules/quote.js";
export declare class CompanyService {
    static generate(edinetCode: EdinetCode, quote: Quote | undefined): Company;
}
