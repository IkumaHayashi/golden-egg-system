import { IEdinetCode } from "../firestore/models/edinetCode";
export interface ICompany {
    readonly price: number | undefined;
    readonly currency: string | undefined;
    readonly dividend: number | undefined;
    readonly dividend_yield: number | undefined;
}
export declare class Company implements ICompany, IEdinetCode {
    readonly edinet_code: string;
    readonly kind: string;
    readonly listed: string;
    readonly consolidated: string;
    readonly capital: string;
    readonly settlement_date: string;
    readonly name: string;
    readonly name_alphabet: string;
    readonly name_phonetic: string;
    readonly address: string;
    readonly type_of_industry: string;
    readonly fund_code: string;
    readonly corporate_code: string;
    readonly price: number | undefined;
    readonly currency: string | undefined;
    readonly dividend: number | undefined;
    readonly dividend_yield: number | undefined;
    constructor(edinet_code: string, kind: string, listed: string, consolidated: string, capital: string, settlement_date: string, name: string, name_alphabet: string, name_phonetic: string, address: string, type_of_industry: string, fund_code: string, corporate_code: string, price: number | undefined, currency: string | undefined, dividend: number | undefined, dividend_yield: number | undefined);
}
