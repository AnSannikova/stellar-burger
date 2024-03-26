import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient> | [];
};

type TBurgersState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
  constructorItems: TConstructorItems;
};

interface TConstructorIngredient extends TIngredient {
  index: number;
}

const initialState: TBurgersState = {
  ingredients: [],
  loading: true,
  error: null,
  constructorItems: {
    bun: null,
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
    },
    resetConstructorItems: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
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

export const {
  addConstructorItem,
  removeConstructorItem,
  moveUpConstructorItem,
  moveDownConstructorItem,
  resetConstructorItems
} = burgersSlice.actions;
