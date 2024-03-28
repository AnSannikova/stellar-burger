import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  userOrders: TOrder[] | [];
  error: boolean | null;
  isLoading: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  userOrders: [],
  error: null,
  isLoading: false
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

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateUserData: Partial<TRegisterData>) =>
    updateUserApi(updateUserData)
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const getUserOrders = createAsyncThunk('user/getUserOrders', async () =>
  getOrdersApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser())
        .then(() => {
          dispatch(authChecked());
        })
        .catch(() => {
          console.log('Ошибка аутентификации');
        });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.error = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.userData = null;
      state.isAuthChecked = false;
    }
  },
  selectors: {
    isErrorSelector: (state) => state.error,
    authCheckedSelector: (state) => state.isAuthChecked,
    getUserDataSelector: (state) => state.userData,
    getUserOrdersSelector: (state) => state.userOrders,
    isLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = true;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload.user };
        state.isAuthChecked = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.error = true;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = { ...action.payload.user };
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload.orders;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;

export const {
  isErrorSelector,
  authCheckedSelector,
  getUserDataSelector,
  getUserOrdersSelector,
  isLoadingSelector
} = userSlice.selectors;

export const { resetErrorMessage, authChecked, userLogout } = userSlice.actions;
