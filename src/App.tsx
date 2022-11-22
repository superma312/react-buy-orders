import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Datasets from './pages/Datasets/Datasets';
import BuyOrders from './pages/BuyOrders/BuyOrders';
import BuyOrderDetail from './pages/BuyOrder/BuyOrderDetail';
import { getAllCountries } from './store/reducers/country/actions';

import './App.scss';
import { thunkDispatch } from './store/store';

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
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/buy-orders" element={<BuyOrders />} />
          <Route path="/buy-orders/:id" element={<BuyOrderDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
