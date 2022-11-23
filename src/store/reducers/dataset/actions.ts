import { createAsyncThunk } from '@reduxjs/toolkit';

import { get } from '../../../services/api/restHelopers';
import { IDataset } from '../../../types/Dataset';

export const getAllDatasets = createAsyncThunk('datasets/all', async () => {
  try {
    const data = await get('datasets');
    return data as IDataset[];
  } catch (err) {
    throw (err as any).detail || err;
  }
});
