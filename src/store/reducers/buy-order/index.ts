import { createSlice } from "@reduxjs/toolkit";

import { TAPIStatus } from "../../../types/api";
import { RootState } from "../../store";
import { getAllBuyOrders, getBuyOrderById } from "./actions";

export interface IBuyOrder {
  id: string;
  name: string;
  createdAt: string;
  datasetIds: number[];
  countries: string[];
  budget: number;
}

export interface IBuyOrderState {
  all: IBuyOrder[] | null;
  status: TAPIStatus;
  error: string | null;
  detail: IBuyOrder | null
}

const initialState: IBuyOrderState = {
  all: null,
  status: null,
  error: null,
  detail: null
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
        console.error("getAirPortById error: ", error);
      });
    },
});

// Reducers
export default buyOrderSlice.reducer;

// Selectors
export const buyOrderSelector = (state: RootState) => {
  return state.buyOrder;
};
