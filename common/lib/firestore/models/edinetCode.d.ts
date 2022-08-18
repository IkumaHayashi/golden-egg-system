import { Converter } from "./converter.js";
export interface RawEdinetCode {
    ＥＤＩＮＥＴコード: string;
    提出者種別: string;
    上場区分: string;
    連結の有無: string;
    資本金: string;
    決算日: string;
    提出者名: string;
    "提出者名（英字）": string;
    "提出者名（ヨミ）": string;
    所在地: string;
    提出者業種: string;
    証券コード: string;
    提出者法人番号: string;
}
export interface IEdinetCode {
    /** ＥＤＩＮＥＴコード */
    readonly edinet_code: string;
    /** 提出者種別 */
    readonly kind: string;
    /** 上場区分 */
    readonly listed: string;
    /** 連結の有無 */
    readonly consolidated: string;
    /** 資本金 */
    readonly capital: string;
    /** 決算日 */
    readonly settlement_date: string;
    /** 提出者名 */
    readonly name: string;
    /** 提出者名（英字） */
    readonly name_alphabet: string;
    /** 提出者名（ヨミ） */
    readonly name_phonetic: string;
    /** 所在地 */
    readonly address: string;
    /** 提出者業種 */
    readonly type_of_industry: string;
    /** 証券コード */
    readonly fund_code: string;
    /** 提出者法人番号 */
    readonly corporate_code: string;
}
export declare class EdinetCode implements IEdinetCode {
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
    static fromJson(rawObject: RawEdinetCode): EdinetCode;
}
export declare const EdinetCodeCnverter: Converter<EdinetCode>;
