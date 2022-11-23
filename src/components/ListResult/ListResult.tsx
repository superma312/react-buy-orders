import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { countrySelector } from '../../store/reducers/country';

interface IListResultProps {
  count: number;
}

const ListResult: FC<IListResultProps> = ({ count }) => {
  const {
    all: countries,
    status: countriesAPIStatus,
    filteredCountriesMap,
  } = useSelector(countrySelector);

  const selectedCountries = useMemo(() => {
    if (!countries || countries.length === 0) {
      return '';
    }

    const filteredCountries = countries.filter(
      (c) => filteredCountriesMap[c.countryCode]
    );

    if (filteredCountries.length === 0) {
      return '';
    }

    return filteredCountries.map((c) => c.name).join(' & ');
  }, [countries, filteredCountriesMap]);

  if (countriesAPIStatus !== 'success') {
    return null;
  }

  return (
    <p>
      Showing {count} results{' '}
      {count > 0 && (
        <span>
          from <strong>{selectedCountries}</strong>
        </span>
      )}
    </p>
  );
};

export default ListResult;
