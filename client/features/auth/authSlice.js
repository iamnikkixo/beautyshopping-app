import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../assets/shared/baseURL';

// login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}users/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An error occurred. Please try again later.');
      }
    }
  }
);

// register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          'An error occurred during registration. Please try again.'
        );
      }
    }
  }
);

const initialState = {
  token: null,
  isAuthenticated: false,
  user: {
    firstName: null,
    lastName: null,
  },
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = {
          ...action.payload.user,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
        };
        state.error = null;
        console.log('Login Successful');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = {
          firstName: null,
          lastName: null,
        };
        state.error = action.payload;
        console.log('Login Unsuccessful');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Registration Successful! Please login again');
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        console.log('Registration Unsuccesful!');
      });
  },
});

export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;
