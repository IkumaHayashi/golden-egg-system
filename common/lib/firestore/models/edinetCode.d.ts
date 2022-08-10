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
export declare class EdinetCode {
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
    constructor(
    /** ＥＤＩＮＥＴコード */
    edinet_code: string, 
    /** 提出者種別 */
    kind: string, 
    /** 上場区分 */
    listed: string, 
    /** 連結の有無 */
    consolidated: string, 
    /** 資本金 */
    capital: string, 
    /** 決算日 */
    settlement_date: string, 
    /** 提出者名 */
    name: string, 
    /** 提出者名（英字） */
    name_alphabet: string, 
    /** 提出者名（ヨミ） */
    name_phonetic: string, 
    /** 所在地 */
    address: string, 
    /** 提出者業種 */
    type_of_industry: string, 
    /** 証券コード */
    fund_code: string, 
    /** 提出者法人番号 */
    corporate_code: string);
    static fromJson(rawObject: RawEdinetCode): EdinetCode;
}
export declare const EdinetCodeCnverter: Converter<EdinetCode>;
