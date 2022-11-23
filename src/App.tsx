import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/Header/Header';
import Datasets from './pages/DatasetList/DatasetList';
import BuyOrderList from './pages/BuyOrder/BuyOrderList/BuyOrderList';
import BuyOrderDetail from './pages/BuyOrder/BuyOrderDetail/BuyOrderDetail';
import { getAllCountries } from './store/reducers/country/actions';
import { thunkDispatch } from './store/store';
import BuyOrderEdit from './pages/BuyOrder/BuyOrderEdit/BuyOrderEdit';
import BuyOrderCreate from './pages/BuyOrder/BuyOrderCreate/BuyOrderCreate';

import './App.scss';

function App() {
  useEffect(() => {
    const fetchData = () => {
      thunkDispatch(getAllCountries());
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <Routes>
                <Route path="/" element={<Navigate to="/datasets" />} />
                <Route path="/datasets" element={<Datasets />} />
                <Route path="/buy-orders" element={<BuyOrderList />} />
                <Route path="/buy-orders/new" element={<BuyOrderCreate />} />
                <Route path="/buy-orders/:id" element={<BuyOrderDetail />} />
                <Route path="/buy-orders/:id/edit" element={<BuyOrderEdit />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
