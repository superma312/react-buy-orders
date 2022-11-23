import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getAllCountries } from './store/reducers/country/actions';
import { thunkDispatch } from './store/store';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';

import './App.scss';

const Datasets = React.lazy(() => import('./pages/DatasetList/DatasetList'));
const BuyOrderList = React.lazy(
  () => import('./pages/BuyOrder/BuyOrderList/BuyOrderList')
);
const BuyOrderDetail = React.lazy(
  () => import('./pages/BuyOrder/BuyOrderDetail/BuyOrderDetail')
);
const BuyOrderCreate = React.lazy(
  () => import('./pages/BuyOrder/BuyOrderCreate/BuyOrderCreate')
);
const BuyOrderEdit = React.lazy(
  () => import('./pages/BuyOrder/BuyOrderEdit/BuyOrderEdit')
);

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
                <Route
                  path="/datasets"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Datasets />
                    </Suspense>
                  }
                />
                <Route
                  path="/buy-orders"
                  element={
                    <Suspense fallback={<Loader />}>
                      <BuyOrderList />
                    </Suspense>
                  }
                />
                <Route
                  path="/buy-orders/new"
                  element={
                    <Suspense fallback={<Loader />}>
                      <BuyOrderCreate />
                    </Suspense>
                  }
                />
                <Route
                  path="/buy-orders/:id"
                  element={
                    <Suspense fallback={<Loader />}>
                      <BuyOrderDetail />
                    </Suspense>
                  }
                />
                <Route
                  path="/buy-orders/:id/edit"
                  element={
                    <Suspense fallback={<Loader />}>
                      <BuyOrderEdit />
                    </Suspense>
                  }
                />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
