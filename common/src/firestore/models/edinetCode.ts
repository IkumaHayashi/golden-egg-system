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

export class EdinetCode implements IEdinetCode {
  constructor(
    readonly edinet_code: string,
    readonly kind: string,
    readonly listed: string,
    readonly consolidated: string,
    readonly capital: string,
    readonly settlement_date: string,
    readonly name: string,
    readonly name_alphabet: string,
    readonly name_phonetic: string,
    readonly address: string,
    readonly type_of_industry: string,
    readonly fund_code: string,
    readonly corporate_code: string
  ) {}
  static fromJson(rawObject: RawEdinetCode): EdinetCode {
    return new EdinetCode(
      rawObject["ＥＤＩＮＥＴコード"],
      rawObject["提出者種別"],
      rawObject["上場区分"],
      rawObject["連結の有無"],
      rawObject["資本金"],
      rawObject["決算日"],
      rawObject["提出者名"],
      rawObject["提出者名（英字）"],
      rawObject["提出者名（ヨミ）"],
      rawObject["所在地"],
      rawObject["提出者業種"],
      String(rawObject["証券コード"]),
      rawObject["提出者法人番号"]
    );
  }
}
export const EdinetCodeCnverter: Converter<EdinetCode> = {
  fromFirestore(snapshot, option) {
    return snapshot.data(option) as EdinetCode;
  },
  toFirestore(model) {
    return model;
  },
};
