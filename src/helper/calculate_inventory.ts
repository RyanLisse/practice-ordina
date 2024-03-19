import { Inventory } from '../model/types.ts';

export function calculateInventory(
  startInventory: Inventory,
  transactionLog: string
): Inventory {
  const updatedInventory: Inventory = { ...startInventory };
  transactionLog.split('\n').forEach((transaction) => {
    const [cin, transactionType, quantityStr] = transaction.split(' ');
    const quantity = parseInt(quantityStr, 10);

    updatedInventory[cin] = updatedInventory[cin] || 0;

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
