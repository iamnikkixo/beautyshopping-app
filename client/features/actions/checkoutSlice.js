import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../assets/shared/baseURL';

const initialState = {
  orderId: null,
  error: null,
};

export const checkoutAsync = createAsyncThunk(
  'checkout/checkoutAsync',
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${baseURL}checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error with checkout', error.response);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAsync.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.error = null;
      })
      .addCase(checkoutAsync.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const checkoutReducer = checkoutSlice.reducer;
