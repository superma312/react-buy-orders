import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import dayjs from 'dayjs';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import Layout from '../../components/Layout/Layout';
import { getBuyOrderById } from '../../store/reducers/buy-order/actions';
import { thunkDispatch } from '../../store/store';
import { buyOrderSelector } from '../../store/reducers/buy-order';
import Loader from '../../components/Loader/Loader';
import PageHeader from '../../components/PageHeader/PageHeader';
import { countrySelector } from '../../store/reducers/country';
import { getAllDatasets } from '../../store/reducers/dataset/actions';
import { datasetSelector, IDataset } from '../../store/reducers/dataset';

import './BuyOrderDetail.scss';

const BuyOrderDetail = () => {
  const params = useParams();
  const [datasets, setDatasets] = useState<IDataset[]>([]);
  const { detail, status: detailStatus } = useSelector(buyOrderSelector);
  const { status: countryStatus, countryMap } = useSelector(countrySelector);
  const { all: allDatasets, status: datasetStatus } = useSelector(datasetSelector);

  useEffect(() => {
    const fetchData = () => {
      if (params.id) {
        thunkDispatch(getBuyOrderById(params.id));
        thunkDispatch(getAllDatasets());
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    let datsetsList = [];

    if (detailStatus === 'success' && datasetStatus === 'success' && detail?.datasetIds) {
      const datsetsObj = detail.datasetIds.reduce((acc, currentVal) => {
        if (allDatasets) {
          const datasetIndex = allDatasets.map(d => d.id).indexOf(currentVal);
          if (datasetIndex !== -1) {
            acc[currentVal] = allDatasets[datasetIndex];
          }
        }

        return acc;
      }, {} as Record<number, IDataset>);

      for (let i = 0; i < detail.datasetIds.length; i++) {
        const id = detail.datasetIds[i];
        datsetsList.push(datsetsObj[id]);
      }
    }

    setDatasets(datsetsList);
  }, [allDatasets, datasetStatus, detail, detailStatus]);

  const renderDetailBody = () => {
    if (detailStatus === 'pending' || countryStatus === 'pending' || datasetStatus === 'pending') {
      return <Loader />;
    }

    if (!detail) {
      return <Alert variant='warning' className='m-2'>No data</Alert>;
    }

    return (
      <Row className='bg-gray-black p-4'>
        <Col xs={12} md={6} className='mb-3'>
          <u className='text-secondary'>Order name</u>
          <div>{detail.name}</div>
        </Col>
        <Col xs={12} md={6} className='mb-3'>
          <u className='text-secondary'>Date Created</u>
          <div>{dayjs(detail.createdAt).format('MM/DD/YYYY')}</div>
        </Col>
        <Col xs={12} md={6} className='mb-3'>
          <u className='text-secondary'>Order Budget</u>
          <div>${detail.budget.toFixed(2)}</div>
        </Col>
        <Col xs={12} md={6}></Col>

        <Col xs={12} className='mb-3'>
          <u className='text-secondary'>Included datasets</u>
          <Row>
            {datasets.map(dataset => (
              <Col xs={12} md={6} key={`dataset_${dataset.id}`} className='mb-3'>
                <div className='d-flex align-items-center bg-gray-white p-2'>
                  <img src={dataset.thumbnailUrl} alt='thumbnail' className='me-2 thumbnail' />
                  <div>
                    <div>{dataset.label}</div>
                    <div className='fw-lighter cost'>${dataset.costPerRecord.toFixed(2)} per record</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={6} className='mb-3'>
          <u className='text-secondary'>Date Created</u>
          <div>
            {detail.countries && detail.countries.map(countryCode => (
              <Badge pill bg="light" className='mx-1 text-dark bg-gray-white' key={`country_${countryCode}`}>
                {countryMap[countryCode]}
              </Badge>
            ))}
          </div>
        </Col>
        <Col xs={12} md={6}></Col>

        <Col xs={12} md={6}></Col>
        <Col xs={12} md={6}>
          <Button className='me-2'>Edit Order</Button>
          <Button>Delete Order</Button>
        </Col>
      </Row>
    );
  };

  console.log(222, detail)
  console.log(333, datasets)

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <PageHeader title='Buy Order Details' />
          </Col>
        </Row>
        <Row>
          <Col>{renderDetailBody()}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default BuyOrderDetail;