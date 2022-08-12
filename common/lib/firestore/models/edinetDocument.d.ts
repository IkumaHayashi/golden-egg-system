export declare class EdinetDocument {
    readonly doc_id: string;
    readonly doc_description: string;
    readonly doc_type_code: string;
    readonly edinet_code: string;
    readonly filer_name: string;
    readonly prefix: string;
    readonly start_date: Date;
    readonly end_date: Date;
    constructor(doc_id: string, doc_description: string, doc_type_code: string, edinet_code: string, filer_name: string, prefix: string, start_date: Date, end_date: Date);
}
