export type Inventory = {
  [cin: string]: number;
};

export interface Transaction {
  cin: string;
  publicationType: string;
  quantitySold: number;
}

export class BestSeller {
  readonly cin: string;
  readonly publicationType: string;
  readonly quantitySold: number;

  constructor(cin: string, publicationType: string, quantitySold: number) {
    this.cin = cin;
    this.publicationType = publicationType;
    this.quantitySold = quantitySold;
  }
}
