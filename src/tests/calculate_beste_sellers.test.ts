import { calculateBestSellers } from '../helper/calculate_best_sellers.ts';
import { BestSeller } from '../model/types.ts';
import { test, expect } from 'vitest';

test('correctly calculates the best sellers and limits the output', () => {
  const transactionLog = '001,book,10\n002,magazine,5\n003,book,8';
  const result = calculateBestSellers(transactionLog, 2);
  expect(result.length).toBe(2);
  expect(result[0]).toEqual(new BestSeller('001', 'book', 10));
  expect(result[1]).toEqual(new BestSeller('003', 'book', 8));
});

test('filters by publication type', () => {
  const transactionLog = '001,book,10\n002,magazine,5\n003,book,8';
  const result = calculateBestSellers(transactionLog, 2, 'magazine');
  expect(result.length).toBe(1);
  expect(result[0]).toEqual(new BestSeller('002', 'magazine', 5));
});

test('sorts items correctly by quantity sold and CIN', () => {
  const transactionLog = '003,book,5\n001,book,5\n002,book,10';
  const result = calculateBestSellers(transactionLog, 3);
  expect(result.map((item) => item.cin)).toEqual(['002', '001', '003']);
});

test('excludes items with 0 quantity sold', () => {
  const transactionLog = '001,book,0\n002,book,5';
  const result = calculateBestSellers(transactionLog, 2);
  expect(result.length).toBe(1);
  expect(result[0].cin).toBe('002');
});
