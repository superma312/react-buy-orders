import React, { useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import dayjs from 'dayjs';
import Badge from 'react-bootstrap/Badge';
import BootstrapButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
  deleteBuyOrderById,
  getBuyOrderById,
} from '../../../store/reducers/buy-order/actions';
import { thunkDispatch } from '../../../store/store';
import { buyOrderSelector } from '../../../store/reducers/buy-order';
import Loader from '../../../components/Loader/Loader';
import { countrySelector } from '../../../store/reducers/country';
import { getAllDatasets } from '../../../store/reducers/dataset/actions';
import { datasetSelector } from '../../../store/reducers/dataset';
import Button from '../../../components/Button/Button';
import { IDataset } from '../../../types/Dataset';

import './BuyOrderDetail.scss';

const BuyOrderDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isShowConDelModal, setIsShowConDelModal] = useState(false);
  const { detail, detailStatus, deleteStatus } = useSelector(buyOrderSelector);
  const { status: countryStatus, countriesMap } = useSelector(countrySelector);
  const { all: allDatasets, status: datasetStatus } =
    useSelector(datasetSelector);

  useEffect(() => {
    const fetchData = () => {
      if (params.id) {
        thunkDispatch(getBuyOrderById(params.id));
        thunkDispatch(getAllDatasets());
      }
    };

    fetchData();
  }, [params.id]);

  // Redirect to buy orders list page after deleting
  useEffect(() => {
    if (deleteStatus === 'success') {
      navigate('/buy-orders');
    }
  }, [deleteStatus, navigate]);

  // Create a map to get the dataset data with dataset ID efficiently
  const datasetsMap: Record<number, IDataset> = useMemo(() => {
    let map = {};

    if (
      detailStatus === 'success' &&
      datasetStatus === 'success' &&
      detail?.datasetIds
    ) {
      map = detail.datasetIds.reduce((acc, currentVal) => {
        if (allDatasets) {
          const datasetIndex = allDatasets.map((d) => d.id).indexOf(currentVal);
          if (datasetIndex !== -1) {
            acc[currentVal] = allDatasets[datasetIndex];
          }
        }

        return acc;
      }, {} as Record<number, IDataset>);
    }

    return map;
  }, [allDatasets, datasetStatus, detail, detailStatus]);

  const handleDeleteOrder = () => {
    thunkDispatch(deleteBuyOrderById(params.id as string));
    setIsShowConDelModal(false);
  };

  if (
    detailStatus === 'pending' ||
    countryStatus === 'pending' ||
    datasetStatus === 'pending'
  ) {
    return <Loader />;
  }

  if (!detail) {
    return (
      <Alert variant="warning" className="m-2">
        No data
      </Alert>
    );
  }

  return (
    <>
      <h1 className="text-center my-5">Buy Order Details</h1>

      <div className="bg-gray-black p-4">
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <label className="text-secondary text-decoration-underline mb-2">
              Order name
            </label>
            <div>{detail.name}</div>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <label className="text-secondary text-decoration-underline mb-2">
              Date Created
            </label>
            <div>{dayjs(detail.createdAt).format('MM/DD/YYYY')}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <label className="text-secondary text-decoration-underline mb-2">
              Order Budget
            </label>
            <div>${detail.budget.toFixed(2)}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-3">
            <label className="text-secondary text-decoration-underline mb-2">
              Included datasets
            </label>
            <Row>
              {detail.datasetIds.map((datasetId) => (
                <Col
                  xs={12}
                  md={6}
                  key={`dataset_${datasetId}`}
                  className="mb-3"
                >
                  {datasetsMap[datasetId] && (
                    <div className="d-flex align-items-center bg-gray-white p-2">
                      <img
                        src={datasetsMap[datasetId].thumbnailUrl}
                        alt="thumbnail"
                        className="me-2 thumbnail"
                      />
                      <div>
                        <div>{datasetsMap[datasetId].label}</div>
                        <div className="fw-lighter cost">
                          ${datasetsMap[datasetId].costPerRecord.toFixed(2)} per
                          record
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <label className="text-secondary text-decoration-underline mb-2">
              Date Created
            </label>
            <div>
              {detail.countries &&
                detail.countries.map((countryCode) => (
                  <Badge
                    pill
                    bg="light"
                    className="mx-1 text-dark bg-gray-white"
                    key={`country_${countryCode}`}
                  >
                    {countriesMap[countryCode]}
                  </Badge>
                ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={{ span: 6, offset: 6 }} className="mt-4">
            <BootstrapButton
              className="me-2"
              variant="secondary"
              href={`/buy-orders/${params.id}/edit`}
            >
              Edit Order
            </BootstrapButton>
            <Button
              name="Delete Order"
              loading={deleteStatus === 'pending'}
              onClick={() => setIsShowConDelModal(true)}
            />
          </Col>
        </Row>

        <Modal
          show={isShowConDelModal}
          onHide={() => setIsShowConDelModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete this order?</Modal.Body>
          <Modal.Footer>
            <BootstrapButton
              variant="secondary"
              onClick={() => setIsShowConDelModal(false)}
            >
              Close
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={handleDeleteOrder}>
              Yes
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default BuyOrderDetail;
