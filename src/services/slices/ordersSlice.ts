import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TConstructorItems } from './burgersSlice';

type TOrdersState = {
  error: string | null | undefined;
  orderResponse: {
    success: boolean;
    order: TOrder | null;
  };
};

const initialState: TOrdersState = {
  error: null,
  orderResponse: {
    success: false,
    order: null
  }
};

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (items: TConstructorItems) => {
    let orderData;
    if (items.bun && items.ingredients.length > 0) {
      orderData = [items.bun._id];
      items.ingredients.forEach((item) => orderData.push(item._id));
    }
    return orderBurgerApi(orderData!);
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderResponse: (state) => {
      state.orderResponse = {
        success: false,
        order: null
      };
    }
  },
  selectors: {
    getOrderResponseSelector: (state) => state.orderResponse
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderResponse.success = action.payload.success;
        state.orderResponse.order = action.payload.order;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;

export const { getOrderResponseSelector } = ordersSlice.selectors;

export const { resetOrderResponse } = ordersSlice.actions;
