import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../../../components/Layout/Layout';
import BuyOrderForm, {
  initialBuyOrderData,
} from '../../../components/BuyOrder/BuyOrderForm/BuyOrderForm';
import {
  buyOrderSelector,
  IBuyOrderPartial,
} from '../../../store/reducers/buy-order';
import { createBuyOrder } from '../../../store/reducers/buy-order/actions';
import { thunkDispatch } from '../../../store/store';
import { getAllDatasets } from '../../../store/reducers/dataset/actions';
import { datasetSelector } from '../../../store/reducers/dataset';
import Loader from '../../../components/Loader/Loader';
import { countrySelector } from '../../../store/reducers/country';

const BuyOrderCreate = () => {
  const navigate = useNavigate();
  const { createStatus } = useSelector(buyOrderSelector);
  const { status: datasetAPIStatus } = useSelector(datasetSelector);
  const { status: countryAPIStatus } = useSelector(countrySelector);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllDatasets());
    };

    fetchData();
  }, []);

  // Redirect to the list page after creating
  useEffect(() => {
    if (createStatus === 'success') {
      navigate('/buy-orders');
    }
  }, [createStatus, navigate]);

  const handleSubmit = (data: IBuyOrderPartial) => {
    thunkDispatch(
      createBuyOrder({
        ...data,
        createdAt: new Date(),
      })
    );
  };

  if (datasetAPIStatus === 'pending' || countryAPIStatus === 'pending') {
    return <Loader />;
  }

  return (
    <Layout title='New Buy Order'>
      <BuyOrderForm
        details={initialBuyOrderData}
        isSubmiting={createStatus === 'pending'}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default BuyOrderCreate;
