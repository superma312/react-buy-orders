import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

import Layout from '../../../components/Layout/Layout';
import CountryFilter from '../../../components/CountryFilter/CountryFilter';
import BuyOrderItem from '../../../components/BuyOrder/BuyOrderItem/BuyOrderList';
import { buyOrderSelector } from '../../../store/reducers/buy-order';
import { getAllBuyOrders } from '../../../store/reducers/buy-order/actions';
import Loader from '../../../components/Loader/Loader';
import CountryListLabel from '../../../components/CountryListLabel/CountryListLabel';
import { checkCountryAvailability } from '../../../utils/filter';
import { countrySelector } from '../../../store/reducers/country';
import { thunkDispatch } from '../../../store/store';

import './BuyOrderList.scss';

const BuyOrderList = () => {
  const { all: buyOrders, status: buyOrdersStatus } = useSelector(buyOrderSelector);
  const { status: countryStatus, countryFilters } = useSelector(countrySelector);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllBuyOrders());
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoaded(buyOrdersStatus === 'success' && countryStatus === 'success')
  }, [buyOrdersStatus, countryStatus]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (!buyOrders || buyOrders.length === 0) {
    return <Alert variant='warning' className='m-2'>No data</Alert>;
  }

  const filtered = buyOrders.filter(
    buyOrder => checkCountryAvailability(
      buyOrder.countries,
      countryFilters
    )
  );

  const buyOrdersLen = filtered ? filtered.length : 0;

  return (
    <Layout title='Your Buy Orders'>
      <p>Showing {buyOrdersLen} results <CountryListLabel /></p>
      {filtered.map((buyOrder, index) => (
        <div className="mb-3" key={`buy-order-${index}`}>
          <Link to={`/buy-orders/${buyOrder.id}`} className="buy-order-item">
            <BuyOrderItem data={buyOrder} />
          </Link>
        </div>
      ))}
      <CountryFilter />
    </Layout>
  );
};

export default BuyOrderList;
