import { createSlice } from '@reduxjs/toolkit';

import { TAPIStatus } from '../../../types/api';
import { IDataset } from '../../../types/Dataset';
import { RootState } from '../../store';
import { getAllDatasets } from './actions';

export interface IDatasetState {
  all: IDataset[] | null;
  status: TAPIStatus;
  error: string | null;
}

const initialState: IDatasetState = {
  all: null,
  status: null,
  error: null,
};

const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDatasets.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllDatasets.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.all = payload;
        state.error = null;
      })
      .addCase(getAllDatasets.rejected, (state, { error }) => {
        state.status = 'failure';
        state.all = null;
        state.error = error.message || 'Unknown Error';
        console.error('getAllDatasets error: ', error);
      });
  },
});

// Reducers
export default datasetSlice.reducer;

// Selectors
export const datasetSelector = (state: RootState) => {
  return state.dataset;
};
