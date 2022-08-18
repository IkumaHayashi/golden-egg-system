import { IEdinetCode } from "../firestore/models/edinetCode";

export interface ICompany {
  readonly price: number | undefined;
  readonly currency: string | undefined;
  readonly dividend: number | undefined;
  readonly dividend_yield: number | undefined;
}
export class Company implements ICompany, IEdinetCode {
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
    readonly corporate_code: string,
    readonly price: number | undefined,
    readonly currency: string | undefined,
    readonly dividend: number | undefined,
    readonly dividend_yield: number | undefined
  ) {}
}
