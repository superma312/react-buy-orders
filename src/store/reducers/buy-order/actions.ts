import { createAsyncThunk } from "@reduxjs/toolkit";

import { IBuyOrder } from ".";
import { get } from "../../../services/api/restHelopers";

export const getAllBuyOrders = createAsyncThunk(
  "buyOrder/all",
  async () => {
    try {
      const data = await get('buy-orders');
      return data as IBuyOrder[];
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);

export const getBuyOrderById = createAsyncThunk(
  "buyOrder/detail-by-id",
  async (id: string) => {
    try {
      const data = await get(`buy-orders/${id}`);
      return data as IBuyOrder;
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);
