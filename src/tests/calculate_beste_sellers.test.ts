import { test, expect } from 'vitest';
import { BestSeller } from '../model/types';
import {
  calculateBestSellers,
  convertTransactionLog,
  createBestSellerInstances,
  filterByPublicationType,
  sortBestSellers
} from '../helper/calculate_best_sellers.ts';

test('calculateBestSellers handles empty transaction log correctly', () => {
  const transactionLog = ``;
  const result = calculateBestSellers(transactionLog, 2);
  expect(result).toEqual([]);
});

test('convertTransactionLog correctly converts log to Map', () => {
  const transactionLog = `
17000372214424 INCOMING 9
17000372214424 OUTGOING 1
17000372214424 INCOMING 3
42100551007975 OUTGOING 3
42100551007975 INCOMING 1
17000372214424 OUTGOING 4
  `;
  const expected = new Map([
    ['17000372214424', 7],
    ['42100551007975', -2]
  ]);
  const result = convertTransactionLog(transactionLog);
  expect(result).toEqual(expected);
});

test('filterByPublicationType filters transactions correctly', () => {
  const transactions = new Map([
    ['17000372214424', 7],
    ['42100551007975', -2]
  ]);
  const expected = new Map([['17000372214424', 7]]);
  const result = filterByPublicationType(transactions, '17');
  expect(result).toEqual(expected);
});

test('filterByPublicationType returns all transactions when no type is provided', () => {
  const transactions = new Map([
    ['17000372214424', 7],
    ['42100551007975', -2]
  ]);
  const result = filterByPublicationType(transactions, undefined);
  expect(result).toEqual(transactions);
});

test('createBestSellerInstances creates correct instances', () => {
  const transactions = new Map([
    ['17000372214424', 7],
    ['42100551007975', -2]
  ]);
  const expected = [new BestSeller('17000372214424', '17', 7)];
  const result = createBestSellerInstances(transactions);
  expect(result).toEqual(expected);
});

test('sortBestSellers sorts instances correctly', () => {
  const bestSellers = [
    new BestSeller('17000372214424', '17', 7),
    new BestSeller('42100551007975', '42', 10),
    new BestSeller('17000372214425', '17', 7)
  ];
  const expected = [
    new BestSeller('42100551007975', '42', 10),
    new BestSeller('17000372214424', '17', 7),
    new BestSeller('17000372214425', '17', 7)
  ];
  const result = sortBestSellers(bestSellers);
  expect(result).toEqual(expected);
});
