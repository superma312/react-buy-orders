export const checkCountryAvailability = (
  countryCodes: string[],
  countryMap: Record<string, boolean>
) => {
  for (let i = 0; i < countryCodes.length; i++) {
    const countryCode = countryCodes[i];

    if (countryMap[countryCode]) {
      return true;
    }
  }

  return false;
};
