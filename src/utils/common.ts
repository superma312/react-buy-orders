import { IBuyOrderPartial } from '../store/reducers/buy-order';
import { ICountry } from '../store/reducers/country';

export const validateBuyOrderForm = (data: IBuyOrderPartial) => {
  if (
    !data.name ||
    !data.budget ||
    data.countries?.length === 0 ||
    data.datasetIds?.length === 0
  ) {
    return false;
  }

  return true;
};

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

export const generateCountryListString = (
  countries: ICountry[],
  countryMap: Record<string, boolean>
) => {
  if (!countries || countries.length === 0) {
    return '';
  }

  const filteredCountries = countries.filter((c) => countryMap[c.countryCode]);

  if (filteredCountries.length === 0) {
    return '';
  }

  return filteredCountries.map((c) => c.name).join(', ');
};
