const generatePhoneNumber = (): string => {
  let phoneNumber = "";

  // Generate country code (e.g., +1 for USA)
  const countryCode = Math.floor(Math.random() * 1000);
  phoneNumber += countryCode.toString();

  // Generate area code (e.g., 3 digits for USA)
  phoneNumber += Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Generate local number (e.g., 7 digits for USA)
  phoneNumber += Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0");

  return phoneNumber;
};

export { generatePhoneNumber };
