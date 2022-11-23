import { createSlice } from '@reduxjs/toolkit';

import { TAPIStatus } from '../../../types/api';
import { IBuyOrder } from '../../../types/BuyOrder';
import { RootState } from '../../store';
import {
  createBuyOrder,
  deleteBuyOrderById,
  getAllBuyOrders,
  getBuyOrderById,
  updateBuyOrderById,
} from './actions';

export interface IBuyOrderState {
  all: IBuyOrder[] | null;
  allStatus: TAPIStatus;
  allError: string | null;
  detail: IBuyOrder | null;
  detailStatus: TAPIStatus;
  detailError: string | null;
  updateStatus: TAPIStatus;
  updateError: string | null;
  createStatus: TAPIStatus;
  createError: string | null;
  deleteStatus: TAPIStatus;
  deleteError: string | null;
}

const initialState: IBuyOrderState = {
  all: null,
  allStatus: null,
  allError: null,
  detail: null,
  detailStatus: null,
  detailError: null,
  updateStatus: null,
  updateError: null,
  createStatus: null,
  createError: null,
  deleteStatus: null,
  deleteError: null,
};

const buyOrderSlice = createSlice({
  name: 'buyOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBuyOrders.pending, (state) => {
        state.allStatus = 'pending';
      })
      .addCase(getAllBuyOrders.fulfilled, (state, { payload }) => {
        state.allStatus = 'success';
        state.all = payload;
        state.allError = null;
      })
      .addCase(getAllBuyOrders.rejected, (state, { error }) => {
        state.allStatus = 'failure';
        state.all = null;
        state.allError = error.message || 'Unknown Error';
        console.error('getAllBuyOrders error: ', error);
      })

      // Get by ID
      .addCase(getBuyOrderById.pending, (state) => {
        state.detailStatus = 'pending';
      })
      .addCase(getBuyOrderById.fulfilled, (state, { payload }) => {
        state.detailStatus = 'success';
        state.detail = payload;
        state.detailError = null;
      })
      .addCase(getBuyOrderById.rejected, (state, { error }) => {
        state.detailStatus = 'failure';
        state.detail = null;
        state.detailError = error.message || 'Unknown Error';
        console.error('getBuyOrderById error: ', error);
      })

      // Update by ID
      .addCase(updateBuyOrderById.pending, (state) => {
        state.updateStatus = 'pending';
      })
      .addCase(updateBuyOrderById.fulfilled, (state) => {
        state.updateStatus = 'success';
        state.updateError = null;
      })
      .addCase(updateBuyOrderById.rejected, (state, { error }) => {
        state.updateStatus = 'failure';
        state.updateError = error.message || 'Unknown Error';
        console.error('updateBuyOrderById error: ', error);
      })

      // Create
      .addCase(createBuyOrder.pending, (state) => {
        state.createStatus = 'pending';
      })
      .addCase(createBuyOrder.fulfilled, (state) => {
        state.createStatus = 'success';
        state.createError = null;
      })
      .addCase(createBuyOrder.rejected, (state, { error }) => {
        state.createStatus = 'failure';
        state.createError = error.message || 'Unknown Error';
        console.error('createBuyOrder error: ', error);
      })

      // Delete by ID
      .addCase(deleteBuyOrderById.pending, (state) => {
        state.deleteStatus = 'pending';
      })
      .addCase(deleteBuyOrderById.fulfilled, (state) => {
        state.deleteStatus = 'success';
        state.deleteError = null;
      })
      .addCase(deleteBuyOrderById.rejected, (state, { error }) => {
        state.deleteStatus = 'failure';
        state.deleteError = error.message || 'Unknown Error';
        console.error('deleteBuyOrderById error: ', error);
      });
  },
});

// Reducers
export default buyOrderSlice.reducer;

// Selectors
export const buyOrderSelector = (state: RootState) => {
  return state.buyOrder;
};
