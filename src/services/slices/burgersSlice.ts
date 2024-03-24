import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgersState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
  constructorItems: {
    bun: TIngredient | {};
    ingredients: Array<TIngredient> | [];
  };
};

const initialState: TBurgersState = {
  ingredients: [],
  loading: true,
  error: null,
  constructorItems: {
    bun: {},
    ingredients: []
  }
};

export const getBurgerIngredients = createAsyncThunk(
  'burgers/getAllIngredients',
  async () => getIngredientsApi()
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
    removeConstructorItem: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = {};
      } else {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients?.filter(
            (item) => item._id !== ingredient._id
          );
      }
    },
    moveUpConstructorItem: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
    }
  },
  selectors: {
    getBurgersState: (state) => state,
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.loading,
    getConstructorItemsSelector: (state) => state.constructorItems
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
      });
  }
});

export const burgersReducer = burgersSlice.reducer;
export const {
  getBurgersState,
  getIngredientsSelector,
  getLoadingSelector,
  getConstructorItemsSelector
} = burgersSlice.selectors;
export const { addConstructorItem, removeConstructorItem } =
  burgersSlice.actions;
