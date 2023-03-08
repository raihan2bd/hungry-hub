import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

let logoutTimer;

export const logout = createAction('auth/logout');

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, isLoggedIn }, { rejectWithValue, dispatch }) => {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    if (isLoggedIn) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    }
    try {
      const response = await axios.post(
        url,
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const expirationTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('userId', response.data.localId);
      const remainingTime = calculateRemainingTime(expirationTime);
      return {
        token: response.data.idToken,
        userId: response.data.localId,
        isAuth: true,
        expirationTime: remainingTime,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const retrieveStoredToken = createAsyncThunk(
  'auth/retrive-token',
  () => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userId');
      return {
        token: null,
        userId: null,
        isAuth: false,
        expirationTime: null,
      };
    }

    const storedExpirationDate = localStorage.getItem('expirationTime');
    const userId = localStorage.getItem('userId');
    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userId');
      return {
        token: null,
        userId: null,
        isAuth: false,
        expirationTime: null,
      };
    }

    return {
      token: token,
      userId: userId,
      isAuth: true,
      expirationTime: remainingTime,
    };
  }
);

// initial state of auth slice
const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  isAuth: false,
  expirationTime: null,
};

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userId');
      clearTimeout(logoutTimer);
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
        userId: null,
        isAuth: false,
        expirationTime: null,
      };
    });

    builder.addCase(retrieveStoredToken.fulfilled, (state, {payload}) => {
      return {
        ...state,
        loading: false,
        error: null,
        token: payload.token,
        userId: payload.userId,
        isAuth: payload.isAuth,
      };
    })

    builder.addCase(login.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        token: null,
        userId: null,
        isAuth: false,
        expirationTime: null,
      };
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: null,
        token: payload.token,
        userId: payload.userId,
        isAuth: payload.isAuth,
        expirationTime: payload.expirationTime,
      };
    });

    builder.addCase(login.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
        token: null,
        userId: null,
        isAuth: false,
        expirationTime: null,
      };
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
