import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';

import { IBuyOrder } from '../../../store/reducers/buy-order';

interface IBuyOrderItemProps {
  data: IBuyOrder
}

const BuyOrderItem = ({ data }: IBuyOrderItemProps) => {
  return (
    <Container className='bg-gray-black p-3' fluid>
      <Row>
        <Col sm>
          <u className='text-secondary'>Order name</u>
          <div>{data.name}</div>
        </Col>
        <Col sm>
          <u className='text-secondary'>Date Created</u>
          <div>{dayjs(data.createdAt).format('MM/DD/YYYY')}</div>
        </Col>
        <Col sm>
          <u className='text-secondary'>Budget</u>
          <div>${data.budget.toFixed(2)}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyOrderItem;
