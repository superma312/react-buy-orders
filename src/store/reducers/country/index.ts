import { createSlice } from "@reduxjs/toolkit";

import { TAPIStatus } from "../../../types/api";
import { RootState } from "../../store";
import { getAllCountries } from "./actions";

export interface ICountry {
  countryCode: string;
  name: string;
  storedData: {
    datasetId: number;
    recordCount: number;
  }[]
}

export interface ICountryState {
  all: ICountry[] | null;
  countryMap: Record<string, string>;
  countryFilters: Record<string, boolean>;
  status: TAPIStatus;
  error: string | null;
}

const initialState: ICountryState = {
  all: null,
  countryMap: {},
  countryFilters: {},
  status: null,
  error: null
};

const countrySlice = createSlice({
  name: "ICountry",
  initialState,
  reducers: {
    updateCountryFilters: (state, action) => {
      const isInitialSet = action.payload.isInitialSet;
      for (let i = 0; i < action.payload.countryCodes.length; i++) {
        const countryCode = action.payload.countryCodes[i];
        state.countryFilters[countryCode] = isInitialSet ? true : !state.countryFilters[countryCode];
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCountries.pending, state => {
        state.status = "pending";
        state.countryMap = {};
      })
      .addCase(getAllCountries.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.all = payload;
        state.countryMap = payload.reduce(
          (acc, currentVal) => {
            acc[currentVal.countryCode] = currentVal.name;
            return acc;
          },
          {} as Record<string, string>
        );
        state.error = null;
      })
      .addCase(getAllCountries.rejected, (state, { error }) => {
        state.status = "failure";
        state.all = null;
        state.countryMap = {};
        state.error = error.message || "Unknown Error";
        console.error("getAllCountries error: ", error);
      });
    },
});

// Reducers
export default countrySlice.reducer;

export const { updateCountryFilters } = countrySlice.actions;

// Selectors
export const countrySelector = (state: RootState) => {
  return state.country;
};
