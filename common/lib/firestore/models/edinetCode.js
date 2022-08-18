export class EdinetCode {
    constructor(edinet_code, kind, listed, consolidated, capital, settlement_date, name, name_alphabet, name_phonetic, address, type_of_industry, fund_code, corporate_code) {
        this.edinet_code = edinet_code;
        this.kind = kind;
        this.listed = listed;
        this.consolidated = consolidated;
        this.capital = capital;
        this.settlement_date = settlement_date;
        this.name = name;
        this.name_alphabet = name_alphabet;
        this.name_phonetic = name_phonetic;
        this.address = address;
        this.type_of_industry = type_of_industry;
        this.fund_code = fund_code;
        this.corporate_code = corporate_code;
    }
    static fromJson(rawObject) {
        return new EdinetCode(rawObject["ＥＤＩＮＥＴコード"], rawObject["提出者種別"], rawObject["上場区分"], rawObject["連結の有無"], rawObject["資本金"], rawObject["決算日"], rawObject["提出者名"], rawObject["提出者名（英字）"], rawObject["提出者名（ヨミ）"], rawObject["所在地"], rawObject["提出者業種"], String(rawObject["証券コード"]), rawObject["提出者法人番号"]);
    }
}
export const EdinetCodeCnverter = {
    fromFirestore(snapshot, option) {
        return snapshot.data(option);
    },
    toFirestore(model) {
        return model;
    },
};
