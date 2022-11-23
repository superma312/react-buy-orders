import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

import BuyOrderForm from '../../../components/BuyOrder/BuyOrderForm/BuyOrderForm';
import {
  buyOrderSelector,
  IBuyOrder,
  IBuyOrderPartial,
} from '../../../store/reducers/buy-order';
import {
  getBuyOrderById,
  updateBuyOrderById,
} from '../../../store/reducers/buy-order/actions';
import { thunkDispatch } from '../../../store/store';
import { getAllDatasets } from '../../../store/reducers/dataset/actions';
import Loader from '../../../components/Loader/Loader';
import { countrySelector } from '../../../store/reducers/country';

const BuyOrderEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { detail, detailStatus: detailAPIStatus, updateStatus } = useSelector(buyOrderSelector);
  const { status: countryAPIStatus } = useSelector(countrySelector);

  // Redirect to the detail page after updating
  useEffect(() => {
    if (updateStatus === 'success') {
      navigate(`/buy-orders/${params.id}`);
    }
  }, [updateStatus, params.id, navigate]);

  useEffect(() => {
    const fetchData = () => {
      if (params.id) {
        thunkDispatch(getBuyOrderById(params.id));
        thunkDispatch(getAllDatasets());
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = (data: IBuyOrderPartial) => {
    thunkDispatch(
      updateBuyOrderById({
        id: params.id as string,
        data: data as IBuyOrder,
      })
    );
  };

  if (detailAPIStatus === 'pending' || countryAPIStatus === 'pending') {
    return <Loader />;
  }

  if (!detail) {
    return (
      <Alert variant='warning' className='m-2'>
        No data
      </Alert>
    );
  }

  return (
    <>
      <h1 className='text-center my-5'>Edit Buy Order</h1>
      <BuyOrderForm
        details={detail}
        isSubmiting={updateStatus === 'pending'}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BuyOrderEdit;
