import { TLoginData, TRegisterData, loginUserApi, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export const userReducer = userSlice.reducer;
