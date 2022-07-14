import { Converter } from "./converter";

export class EdinetCode {
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
}
export const EdinetCodeCnverter: Converter<EdinetCode> = {
  fromFirestore(snapshot, option) {
    return snapshot.data(option) as EdinetCode;
  },
  toFirestore(model) {
    return model;
  },
};
