import { createAsyncThunk } from '@reduxjs/toolkit';

import { del, get, post, put } from '../../../services/api/restHelopers';
import { IBuyOrder, IBuyOrderPartial } from '../../../types/BuyOrder';

export const getAllBuyOrders = createAsyncThunk('buyOrder/all', async () => {
  try {
    const data = await get('buy-orders');
    return data as IBuyOrder[];
  } catch (err) {
    throw (err as any).detail || err;
  }
});

export const getBuyOrderById = createAsyncThunk(
  'buyOrder/detail-by-id',
  async (id: string) => {
    try {
      const data = await get(`buy-orders/${id}`);
      return data as IBuyOrder;
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);

export const updateBuyOrderById = createAsyncThunk(
  'buyOrder/update-by-id',
  async (payload: { id: string; data: IBuyOrder }) => {
    try {
      return put(`buy-orders/${payload.id}`, payload.data);
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);

export const createBuyOrder = createAsyncThunk(
  'buyOrder/new',
  async (data: IBuyOrderPartial) => {
    try {
      return post('buy-orders', data);
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);

export const deleteBuyOrderById = createAsyncThunk(
  'buyOrder/delete-by-id',
  async (id: string) => {
    try {
      return del(`buy-orders/${id}`);
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);
