import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { countrySelector } from '../../store/reducers/country';

interface IListResultProps {
  count: number;
}

const ListResult: FC<IListResultProps> = ({ count }) => {
  const [selectedCountries, setSelectedCountries] = useState('');
  const {
    all: countries,
    status: countriesAPIStatus,
    filteredCountriesMap,
  } = useSelector(countrySelector);

  useEffect(() => {
    const generateSelectedCountries = () => {
      if (!countries || countries.length === 0) {
        setSelectedCountries('');
        return;
      }

      const filteredCountries = countries.filter(
        (c) => filteredCountriesMap[c.countryCode]
      );

      if (filteredCountries.length === 0) {
        setSelectedCountries('');
        return;
      }

      setSelectedCountries(filteredCountries.map((c) => c.name).join(' & '));
    };

    generateSelectedCountries();
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
