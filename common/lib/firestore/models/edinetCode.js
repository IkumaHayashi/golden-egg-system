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
}
export const EdinetCodeCnverter = {
    fromFirestore(snapshot, option) {
        return snapshot.data(option);
    },
    toFirestore(model) {
        return model;
    },
};
