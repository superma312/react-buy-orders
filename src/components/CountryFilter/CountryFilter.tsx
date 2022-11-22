import React, { useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';

import { countrySelector, updateCountryFilters } from '../../store/reducers/country';
import { thunkDispatch } from '../../store/store';

import './CountryFilter.scss';

const CountryFilter = () => {
  const { all: countries, status, countryFilters } = useSelector(countrySelector);

  useEffect(() => {
    if (status === 'success') {
      thunkDispatch(updateCountryFilters({
        countryCodes: countries?.map(c => c.countryCode),
        isInitialSet: true
      }));
    }
  }, [countries, status]);


  const handleFilter = (countryCode: string) => {
    thunkDispatch(updateCountryFilters({
      countryCodes: [countryCode]
    }));
  };

  if (status === 'pending') {
    return null;
  }

  return (
    <div className='country-filter-container'>
      <div className='border border-dark wrapper p-3 bg-gray-white'>
        <u className='text-secondary'>Included countries:</u>
        <div className='country-list'>
          {countries && countries.map(country => (
            <Badge
              pill
              bg={countryFilters[country.countryCode] ? 'light' : ''}
              className='m-1 text-dark border border-dark cursor-pointer'
              key={`country_filter_${country.countryCode}`}
              onClick={() => handleFilter(country.countryCode)}
            >
              {country.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryFilter;
