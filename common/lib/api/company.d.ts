import { EdinetCode } from "../firestore/models/edinetCode";
interface ICompanyResponse extends EdinetCode {
    price: number | undefined;
    currency: string | undefined;
    dividend: number | undefined;
    dividend_yield: number | undefined;
}
export { ICompanyResponse };
