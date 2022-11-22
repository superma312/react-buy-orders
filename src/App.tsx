import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Datasets from './pages/Datasets/Datasets';
import BuyOrders from './pages/BuyOrders/BuyOrders';
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
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/datasets" />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/buy-orders" element={<BuyOrders />} />
          <Route path="/buy-orders/new" element={<BuyOrderCreate />} />
          <Route path="/buy-orders/:id" element={<BuyOrderDetail />} />
          <Route path="/buy-orders/:id/edit" element={<BuyOrderEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
