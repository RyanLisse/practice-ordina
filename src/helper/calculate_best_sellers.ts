import { BestSeller, Transaction } from '../model/types.ts';

export function calculateBestSellers(
  transactionLog: string,
  n: number,
  publicationType?: string
): BestSeller[] {
  const transactions: Transaction[] = transactionLog.split('\n').map((line) => {
    const [cin, type, quantityStr] = line.split(',');
    return {
      cin,
      publicationType: type,
      quantitySold: parseInt(quantityStr, 10)
    };
  });

  let filteredTransactions: Transaction[];
  if (publicationType) {
    filteredTransactions = transactions.filter(
      (t) => t.publicationType === publicationType
    );
  } else {
    filteredTransactions = transactions;
  }

  const salesData: {
    [cin: string]: { publicationType: string; quantitySold: number };
  } = {};
  filteredTransactions.forEach(({ cin, publicationType, quantitySold }) => {
    if (!salesData[cin]) {
      salesData[cin] = { publicationType, quantitySold: 0 };
    }
    salesData[cin].quantitySold += quantitySold;
  });

  const bestSellers: BestSeller[] = [];
  for (const [cin, item] of Object.entries(salesData)) {
    if (item.quantitySold > 0) {
      bestSellers.push(
        new BestSeller(cin, item.publicationType, item.quantitySold)
      );
    }
  }
  // console.log(bestSellers);
  bestSellers.sort(
    (a, b) => b.quantitySold - a.quantitySold || a.cin.localeCompare(b.cin)
  );
  // console.log('Sorted Best Sellers', bestSellers);
  if (n >= bestSellers.length) {
    return bestSellers;
  }

  return bestSellers.slice(0, n);
}
