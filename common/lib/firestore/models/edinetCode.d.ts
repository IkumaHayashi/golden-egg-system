import { Converter } from "./converter";
export declare class EdinetCode {
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
    constructor(edinet_code: string, kind: string, listed: string, consolidated: string, capital: string, settlement_date: string, name: string, name_alphabet: string, name_phonetic: string, address: string, type_of_industry: string, fund_code: string, corporate_code: string);
}
export declare const EdinetCodeCnverter: Converter<EdinetCode>;
