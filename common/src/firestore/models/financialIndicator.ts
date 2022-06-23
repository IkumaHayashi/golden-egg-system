export class FinancialIndicator {
  constructor(
    readonly label_en: string,
    readonly label_ja: string,
    readonly local_name: string,
    readonly unit: string,
    readonly decimals: number,
    readonly x_value: number | string
  ) {}
}
