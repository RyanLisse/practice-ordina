import { expect, test } from 'vitest';
import { calculateInventory } from '../helper/calculate_inventory.ts';
import { Inventory } from '../model/types.ts';

test('should return the correct inventory for a single transaction', () => {
  const startInventory = { '17000372214424': 5 };
  const transactionLog = '17000372214424 INCOMING 3';

  const result = calculateInventory(startInventory, transactionLog);

  expect(result).toEqual({ '17000372214424': 8 });
});

test('calculateInventory - handles transactions for items not in the initial inventory', () => {
  const startInventory: Inventory = {};
  const transactionLog = '42100551007975 INCOMING 1';
  const expectedInventory: Inventory = { '42100551007975': 1 };

  const updatedInventory = calculateInventory(startInventory, transactionLog);
  expect(updatedInventory).toEqual(expectedInventory);
});

test('calculateInventory - maintains items with 0 inventory in the returned inventory', () => {
  const startInventory: Inventory = { '17000372214424': 2 };
  const transactionLog = '17000372214424 OUTGOING 2';
  const expectedInventory: Inventory = { '17000372214424': 0 };

  const updatedInventory = calculateInventory(startInventory, transactionLog);
  expect(updatedInventory).toEqual(expectedInventory);
});

test('calculateInventory - throws an error for transactions leading to negative inventory', () => {
  const startInventory: Inventory = { '17000372214424': 1 };
  const transactionLog = '17000372214424 OUTGOING 2';

  const attemptCalculation = () =>
    calculateInventory(startInventory, transactionLog);
  expect(attemptCalculation).toThrow(
    'Negative stock quantity detected after processing transactions.'
  );
});

test('calculateInventory - ensures the startInventory object is not mutated', () => {
  const startInventory: Inventory = { '17000372214424': 10 };
  const transactionLog = '17000372214424 INCOMING 5';
  calculateInventory(startInventory, transactionLog);

  expect(startInventory).toEqual({ '17000372214424': 10 });
});
