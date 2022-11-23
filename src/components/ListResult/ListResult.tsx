import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { countrySelector } from '../../store/reducers/country';
import { generateCountryListString } from '../../utils/common';

interface IListResultProps {
  count: number;
}

const ListResult: FC<IListResultProps> = ({ count }) => {
  const [countryListString, setCountryListString] = useState('');
  const {
    all: countries,
    status: countriesAPIStatus,
    filteredCountriesMap,
  } = useSelector(countrySelector);

  useEffect(() => {
    setCountryListString(generateCountryListString(countries || [], filteredCountriesMap));
  }, [countries, filteredCountriesMap]);

  if (countriesAPIStatus !== 'success') {
    return null;
  }

  return (
    <p>
      Showing {count} results {count > 0 && <span>from <strong>{countryListString}</strong></span>}
    </p>
  );
};

export default ListResult;
