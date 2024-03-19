import { BestSeller } from '../model/types.ts';

/**
 * Calculate the best-selling items based on the transaction log, with an optional filter by publication type.
 *
 * @param {string} transactionLog - The log of transactions to analyze.
 * @param {number} n - The number of bestsellers to return.
 * @param {string} [publicationType] - Optional. The type of publication to filter by.
 * @return {BestSeller[]} An array of the best-selling items.
 */
export function calculateBestSellers(
  transactionLog: string,
  n: number,
  publicationType?: string
): BestSeller[] {
  const transactions = convertTransactionLog(transactionLog);
  const filteredTransactions = filterByPublicationType(
    transactions,
    publicationType
  );
  const bestSellers = createBestSellerInstances(filteredTransactions);
  const sortedBestSellers = sortBestSellers(bestSellers);
  return sortedBestSellers.slice(0, n);
}

export function convertTransactionLog(
  transactionLog: string
): Map<string, number> {
  const transactions = new Map<string, number>();

  transactionLog
    .trim()
    .split('\n')
    .forEach((line) => {
      const parts = line.split(' ');
      if (parts.length !== 3) return;

      const [cin, action, quantityStr] = parts as [
        string,
        'INCOMING' | 'OUTGOING',
        string
      ];
      const quantity = parseInt(quantityStr, 10);
      if (isNaN(quantity)) return;

      const currentQuantity = transactions.get(cin) || 0;
      transactions.set(
        cin,
        action === 'INCOMING'
          ? currentQuantity + quantity
          : currentQuantity - quantity
      );
    });

  return transactions;
}

export function filterByPublicationType(
  transactions: Map<string, number>,
  publicationType?: string
): Map<string, number> {
  if (!publicationType) {
    return transactions;
  }

  const filteredTransactions = new Map<string, number>();

  for (const [cin, quantity] of transactions.entries()) {
    if (cin.startsWith(publicationType)) {
      const currentQuantity = filteredTransactions.get(cin) || 0;
      filteredTransactions.set(cin, currentQuantity + quantity);
    }
  }
  return filteredTransactions;
}

export function createBestSellerInstances(
  transactions: Map<string, number>
): BestSeller[] {
  const bestSellers: BestSeller[] = [];

  for (const [cin, quantity] of transactions.entries()) {
    if (quantity > 0) {
      bestSellers.push(new BestSeller(cin, cin.slice(0, 2), quantity));
    }
  }
  return bestSellers;
}

export function sortBestSellers(bestSellers: BestSeller[]): BestSeller[] {
  return bestSellers.sort((a, b) => {
    if (b.quantitySold !== a.quantitySold) {
      return b.quantitySold - a.quantitySold;
    }
    return a.cin.localeCompare(b.cin);
  });
}
