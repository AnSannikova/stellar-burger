import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  error: string | null | undefined;
  feeds: {
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
  };
};

const initialState: TFeedsState = {
  error: null,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getAllFeeds = createAsyncThunk('feeds/getAllFeeds', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.feeds.orders,
    getFeedsSelector: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.feeds = { ...action.payload };
      });
  }
});

export const feedsReducer = feedsSlice.reducer;

export const { getOrdersSelector, getFeedsSelector } = feedsSlice.selectors;
