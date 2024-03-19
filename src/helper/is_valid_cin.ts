/**
 * Checks if a given CIN (Customer Identification Number) is valid based on a checksum calculation.
 *
 * @param {string} cin - The CIN to be validated
 * @return {boolean} Returns true if the CIN is valid, false otherwise
 */
export function isValidCin(cin: string): boolean {
  const validCinLength = 14;
  const articleNumberEnd = 12;
  const moduloDivisor = 97;

  if (cin.length !== validCinLength) return false;

  const checksum = parseInt(cin.substring(articleNumberEnd), 10);
  const calculatedChecksum = calculateChecksum(
    cin,
    articleNumberEnd,
    moduloDivisor
  );

  return calculatedChecksum === checksum;
}

function calculateChecksum(
  cin: string,
  length: number,
  divisor: number
): number {
  let checksum = 0;
  for (let i = 0; i < length; i++) {
    checksum += parseInt(cin[i], 10) * (i + 1);
  }
  return checksum % divisor;
}
