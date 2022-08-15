import { EdinetCode } from "../firestore/models/edinetCode";
interface ICompanyResponse extends EdinetCode {
    price: number | undefined;
    currency: string | undefined;
}
export { ICompanyResponse };
