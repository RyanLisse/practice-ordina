export type Inventory = Record<string, number>;

export interface TransactionEntry {
  cin: string;
  transactionType: 'INCOMING' | 'OUTGOING';
  quantity: number;
}

export class BestSeller {
  constructor(
    public readonly cin: string,
    public readonly publicationType: string,
    public readonly quantitySold: number
  ) {}
}
