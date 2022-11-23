import { createAsyncThunk } from '@reduxjs/toolkit';

import { get } from '../../../services/api/restHelopers';
import { ICountry } from '../../../types/Country';

export const getAllCountries = createAsyncThunk('country/all', async () => {
  try {
    const data = await get('countries');
    return data as ICountry[];
  } catch (err) {
    throw (err as any).detail || err;
  }
});
