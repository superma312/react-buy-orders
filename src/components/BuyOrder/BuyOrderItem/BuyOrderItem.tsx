import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';

import { IBuyOrder } from '../../../types/BuyOrder';

interface IBuyOrderItemProps {
  data: IBuyOrder;
}

const BuyOrderItem = ({ data }: IBuyOrderItemProps) => {
  return (
    <Container className="bg-gray-black p-3" fluid>
      <Row>
        <Col sm>
          <label className="text-secondary text-decoration-underline mb-2">
            Order name
          </label>
          <div>{data.name}</div>
        </Col>
        <Col sm>
          <label className="text-secondary text-decoration-underline mb-2">
            Date Created
          </label>
          <div>{dayjs(data.createdAt).format('MM/DD/YYYY')}</div>
        </Col>
        <Col sm>
          <label className="text-secondary text-decoration-underline mb-2">
            Budget
          </label>
          <div>${data.budget.toFixed(2)}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyOrderItem;
