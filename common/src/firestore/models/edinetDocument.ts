export class EdinetDocument {
  constructor(
    readonly doc_id: string,
    readonly doc_description: string,
    readonly doc_type_code: string,
    readonly edinet_code: string,
    readonly filer_name: string,
    readonly prefix: string,
    readonly start_date: Date,
    readonly end_date: Date
  ) {}
}
