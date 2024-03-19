import { Inventory } from '../model/types.ts';

/**
 * Calculates the updated inventory based on the starting inventory and transaction log.
 *
 * @param {Inventory} startInventory - The initial inventory object.
 * @param {string} transactionLog - The log of transactions to process.
 * @return {Inventory} The updated inventory after processing all transactions.
 */
export function calculateInventory(
  startInventory: Inventory,
  transactionLog: string
): Inventory {
  const updatedInventory: Inventory = { ...startInventory };
  transactionLog.split('\n').forEach((transaction) => {
    const [cin, transactionType, quantityStr] = transaction.split(' ');
    const quantity = parseInt(quantityStr, 10);

    if (!updatedInventory[cin]) {
      updatedInventory[cin] = 0;
    }

    if (transactionType === 'INCOMING') {
      updatedInventory[cin] += quantity;
    } else if (transactionType === 'OUTGOING') {
      updatedInventory[cin] -= quantity;
    }
  });

  for (const stock in updatedInventory) {
    if (updatedInventory[stock] < 0) {
      throw new Error(
        'Negative stock quantity detected after processing transactions.'
      );
    }
  }

  return updatedInventory;
}
