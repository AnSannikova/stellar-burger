import { getFeedsApi, getIngredientsApi, orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface TConstructorIngredient extends TIngredient {
  index: number;
}

type TConstructorItems = {
  bun: TIngredient | {};
  ingredients: Array<TIngredient> | [];
};

type TBurgersState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
  constructorItems: TConstructorItems;
  feeds: {
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
  };
};

const initialState: TBurgersState = {
  ingredients: [],
  loading: true,
  error: null,
  constructorItems: {
    bun: {},
    ingredients: []
  },
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getBurgerIngredients = createAsyncThunk(
  'burgers/getAllIngredients',
  async () => getIngredientsApi()
);

export const getAllFeeds = createAsyncThunk('burgers/getAllFeeds', async () =>
  getFeedsApi()
);

export const orderBurger = createAsyncThunk(
  'burgers/orderBurger',
  async (items: TConstructorItems) => {
    let orderData;
    if ('_id' in items.bun && items.ingredients.length > 0) {
      orderData = [items.bun._id];
      items.ingredients.forEach((item) => orderData.push(item._id));
    }
    return orderBurgerApi(orderData!);
  }
);

const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    addConstructorItem: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = {
          ...state.constructorItems.bun,
          ...ingredient
        };
      } else {
        state.constructorItems.ingredients = [
          ...state.constructorItems.ingredients,
          ingredient
        ];
      }
    },
    removeConstructorItem: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveUpConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      state.constructorItems.ingredients.splice(ingredient.index, 1);
      state.constructorItems.ingredients.splice(
        ingredient.index - 1,
        0,
        ingredient
      );
    },
    moveDownConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      state.constructorItems.ingredients.splice(ingredient.index, 1);
      state.constructorItems.ingredients.splice(
        ingredient.index + 1,
        0,
        ingredient
      );
    }
  },
  selectors: {
    getBurgersState: (state) => state,
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.loading,
    getConstructorItemsSelector: (state) => state.constructorItems,
    getOrders: (state) => state.feeds.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBurgerIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBurgerIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.feeds = { ...action.payload };
      })
      .addCase(orderBurger.pending, (state) => {
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.feeds.orders = [...state.feeds.orders, action.payload.order];
      });
  }
});

export const burgersReducer = burgersSlice.reducer;

export const {
  getBurgersState,
  getIngredientsSelector,
  getLoadingSelector,
  getConstructorItemsSelector,
  getOrders
} = burgersSlice.selectors;

export const {
  addConstructorItem,
  removeConstructorItem,
  moveUpConstructorItem,
  moveDownConstructorItem
} = burgersSlice.actions;
