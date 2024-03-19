export function isValidCin(cin: string): boolean {
  const validCinLength = 14;
  const articleNumberEnd = 12;
  const moduloDivisor = 97;
  const checksum = parseInt(
    cin.substring(articleNumberEnd, validCinLength),
    10
  );
  let calculatedChecksum = 0;

  if (cin.length !== validCinLength) return false;

  for (let i = 0; i < articleNumberEnd; i++) {
    calculatedChecksum += parseInt(cin[i], 10) * (i + 1);
  }
  calculatedChecksum %= moduloDivisor;

  return calculatedChecksum === checksum;
}
