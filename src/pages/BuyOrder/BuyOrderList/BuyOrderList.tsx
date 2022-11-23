import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

import CountryFilter from '../../../components/CountryFilter/CountryFilter';
import BuyOrderItem from '../../../components/BuyOrder/BuyOrderItem/BuyOrderItem';
import { buyOrderSelector } from '../../../store/reducers/buy-order';
import { getAllBuyOrders } from '../../../store/reducers/buy-order/actions';
import Loader from '../../../components/Loader/Loader';
import { checkCountryAvailability } from '../../../utils/common';
import { countrySelector } from '../../../store/reducers/country';
import { thunkDispatch } from '../../../store/store';
import ListResult from '../../../components/ListResult/ListResult';

import './BuyOrderList.scss';

const BuyOrderList = () => {
  const { all: buyOrders, allStatus: buyOrdersAPIStatus } =
    useSelector(buyOrderSelector);
  const { status: countriesAPIStatus, filteredCountriesMap } =
    useSelector(countrySelector);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllBuyOrders());
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBuyOrders = useMemo(() => {
    if (!buyOrders || buyOrders.length === 0) {
      return [];
    }

    return buyOrders.filter((buyOrder) =>
      checkCountryAvailability(buyOrder.countries, filteredCountriesMap)
    );
  }, [buyOrders, filteredCountriesMap]);

  if (buyOrdersAPIStatus === 'pending' || countriesAPIStatus === 'pending') {
    return <Loader />;
  }

  if (!buyOrders || buyOrders.length === 0) {
    return (
      <Alert variant='warning' className='m-2'>
        No data
      </Alert>
    );
  }

  return (
    <>
      <h1 className='text-center my-5'>Your Buy Orders</h1>
      <ListResult count={filteredBuyOrders.length} />
      {filteredBuyOrders.map((buyOrder, index) => (
        <div className='mb-3' key={`buy-order-${index}`}>
          <Link to={`/buy-orders/${buyOrder.id}`} className='buy-order-item'>
            <BuyOrderItem data={buyOrder} />
          </Link>
        </div>
      ))}
      <CountryFilter />
    </>
  );
};

export default BuyOrderList;
