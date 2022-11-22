import { createSlice } from "@reduxjs/toolkit";

import { TAPIStatus } from "../../../types/api";
import { RootState } from "../../store";
import { createBuyOrder, deleteBuyOrderById, getAllBuyOrders, getBuyOrderById, updateBuyOrderById } from "./actions";

type Partial<T> = {
  [P in keyof T]: T[P] | null;
};

export interface IBuyOrder {
  id: string;
  name: string;
  createdAt: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
}

export type IBuyOrderPartial = Partial<IBuyOrder>;

export interface IBuyOrderState {
  all: IBuyOrder[] | null;
  status: TAPIStatus;
  error: string | null;
  detail: IBuyOrder | null;
  updateStatus: TAPIStatus;
  updateError: string | null;
  createStatus: TAPIStatus;
  createError: string | null;
  deleteStatus: TAPIStatus;
  deleteError: string | null;
}

const initialState: IBuyOrderState = {
  all: null,
  status: null,
  error: null,
  detail: null,
  updateStatus: null,
  updateError: null,
  createStatus: null,
  createError: null,
  deleteStatus: null,
  deleteError: null
};

const buyOrderSlice = createSlice({
  name: "buyOrder",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllBuyOrders.pending, state => {
        state.status = "pending";
      })
      .addCase(getAllBuyOrders.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.all = payload;
        state.error = null;
      })
      .addCase(getAllBuyOrders.rejected, (state, { error }) => {
        state.status = "failure";
        state.all = null;
        state.error = error.message || "Unknown Error";
        console.error("getAllBuyOrders error: ", error);
      })

      .addCase(getBuyOrderById.pending, state => {
        state.status = "pending";
      })
      .addCase(getBuyOrderById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.detail = payload;
        state.error = null;
      })
      .addCase(getBuyOrderById.rejected, (state, { error }) => {
        state.status = "failure";
        state.detail = null;
        state.error = error.message || "Unknown Error";
        console.error("getBuyOrderById error: ", error);
      })

      // update
      .addCase(updateBuyOrderById.pending, state => {
        state.updateStatus = "pending";
      })
      .addCase(updateBuyOrderById.fulfilled, (state) => {
        state.updateStatus = "success";
        state.updateError = null;
      })
      .addCase(updateBuyOrderById.rejected, (state, { error }) => {
        state.updateStatus = "failure";
        state.updateError = error.message || "Unknown Error";
        console.error("updateBuyOrderById error: ", error);
      })

      // create
      .addCase(createBuyOrder.pending, state => {
        state.createStatus = "pending";
      })
      .addCase(createBuyOrder.fulfilled, (state) => {
        state.createStatus = "success";
        state.createError = null;
      })
      .addCase(createBuyOrder.rejected, (state, { error }) => {
        state.createStatus = "failure";
        state.createError = error.message || "Unknown Error";
        console.error("createBuyOrder error: ", error);
      })
      
      // delete
      .addCase(deleteBuyOrderById.pending, state => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteBuyOrderById.fulfilled, (state) => {
        state.deleteStatus = "success";
        state.deleteError = null;
      })
      .addCase(deleteBuyOrderById.rejected, (state, { error }) => {
        state.deleteStatus = "failure";
        state.deleteError = error.message || "Unknown Error";
        console.error("deleteBuyOrderById error: ", error);
      });
    },
});

// Reducers
export default buyOrderSlice.reducer;

// Selectors
export const buyOrderSelector = (state: RootState) => {
  return state.buyOrder;
};
