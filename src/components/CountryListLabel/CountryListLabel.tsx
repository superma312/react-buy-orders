import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { countrySelector } from '../../store/reducers/country';
import { generateCountryListString } from "../../utils/filter";

const CountryListLabel = () => {
  const [label, setLabel] = useState('');
  const { all: countries, status, countryFilters } = useSelector(countrySelector);

  useEffect(() => {
    setLabel(
      generateCountryListString(
        countries || [],
        countryFilters
      )
    );
  }, [countries, countryFilters]);

  if (!label || status !== 'success') {
    return null;
  }

  return (
    <>from <strong>{label}</strong></>
  );
};

export default CountryListLabel;
