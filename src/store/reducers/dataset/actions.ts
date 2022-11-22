import { createAsyncThunk } from "@reduxjs/toolkit";

import { IDataset } from ".";
import { get } from "../../../services/api/restHelopers";

export const getAllDatasets = createAsyncThunk(
  "datasets/all",
  async () => {
    try {
      const data = await get('datasets');
      return data as IDataset[];
    } catch (err) {
      throw (err as any).detail || err;
    }
  }
);
