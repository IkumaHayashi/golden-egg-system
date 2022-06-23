export class EdinetDocument {
    constructor(doc_id, doc_description, doc_type_code, edinet_code, filer_name, prefix, start_date, end_date) {
        this.doc_id = doc_id;
        this.doc_description = doc_description;
        this.doc_type_code = doc_type_code;
        this.edinet_code = edinet_code;
        this.filer_name = filer_name;
        this.prefix = prefix;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}
