export function formatPhoneNumber(phoneNumber: string): string {
  if (!/^\d{11}$/.test(phoneNumber)) {
    return phoneNumber;
  }

  const countryCode = phoneNumber.slice(0, 1);
  const areaCode = phoneNumber.slice(1, 4);
  const part1 = phoneNumber.slice(4, 7);
  const part2 = phoneNumber.slice(7, 9);
  const part3 = phoneNumber.slice(9, 11);
  const formattedPhoneNumber = `+${countryCode} (${areaCode}) ${part1}-${part2}-${part3}`;

  return formattedPhoneNumber;
}
