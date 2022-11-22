import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import datasetReducer from './reducers/dataset';
import buyOrderReducer from './reducers/buy-order';
import countryReducer from './reducers/country';

export const store = configureStore({
  reducer: {
    dataset: datasetReducer,
    buyOrder: buyOrderReducer,
    country: countryReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
type MyThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
export const thunkDispatch = store.dispatch as MyThunkDispatch;