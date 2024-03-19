import { expect, test } from 'vitest';
import { isValidCin } from '../helper/is_valid_cin.ts';

test('returns true for a valid CIN', () => {
  const validCIN = '17000372214424';
  expect(isValidCin(validCIN)).toBe(true);
});

test('returns false for a CIN with invalid length', () => {
  const shortCIN = '123456789012';
  const longCIN = '123456789012345';
  expect(isValidCin(shortCIN)).toBe(false);
  expect(isValidCin(longCIN)).toBe(false);
});

test('returns false for a CIN with invalid characters', () => {
  const invalidCharsCIN = '12A45678901234';
  expect(isValidCin(invalidCharsCIN)).toBe(false);
});

test('returns false for a CIN with an invalid checksum', () => {
  const invalidChecksumCIN = '17000372214423';
  expect(isValidCin(invalidChecksumCIN)).toBe(false);
});
