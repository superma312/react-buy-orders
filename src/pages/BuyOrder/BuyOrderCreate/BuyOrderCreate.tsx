import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../../../components/Layout/Layout';
import BuyOrderForm, { initialBuyOrderData } from '../../../components/BuyOrder/BuyOrderForm/BuyOrderForm';
import { buyOrderSelector, IBuyOrder, IBuyOrderPartial } from '../../../store/reducers/buy-order';
import { createBuyOrder, updateBuyOrderById } from '../../../store/reducers/buy-order/actions';
import { thunkDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDatasets } from '../../../store/reducers/dataset/actions';

const BuyOrderCreate = () => {
  const navigate = useNavigate();
  const { createStatus } = useSelector(buyOrderSelector);

  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllDatasets());
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (createStatus === 'success') {
      navigate('/buy-orders');
    }
  }, [createStatus, navigate]);

  const handleSubmit = (data: IBuyOrderPartial) => {
    thunkDispatch(createBuyOrder({
      ...data,
      createdAt: new Date()
    }));
  };

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
