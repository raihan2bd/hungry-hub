import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, isLoggedIn }, { rejectWithValue }) => {
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
      return {
        token: response.data.idToken,
        userId: response.data.localId,
        isAuth: true
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// initial state of auth slice
const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    logout(state) {
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
        userId: null,
        isAuth: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        token: null,
        userId: null,
        isAuth: false,
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
      };
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
