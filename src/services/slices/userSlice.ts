import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, getCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  // isAuthenticated: boolean;
  userData: TUser | null;
  error: string | null | undefined;
  // isRequestSuccess: boolean | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  // isAuthenticated: false,
  userData: null,
  error: null
  // isRequestSuccess: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    authCheckedSelector: (state) => state.isAuthChecked,
    getUserDataSelector: (state) => state.userData
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = false;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload.user };
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = false;
      });
  }
});

export const userReducer = userSlice.reducer;

export const {
  authCheckedSelector,
  getUserDataSelector
  // isRequestSuccessSelector
} = userSlice.selectors;

export const { authChecked } = userSlice.actions;
