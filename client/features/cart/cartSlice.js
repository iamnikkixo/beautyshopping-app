import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../assets/shared/baseURL';

const initialState = {
  cartItems: [],
  cartTotalCost: 0,
  cartQty: 0,
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productId, quantity }, { getState }) => {
    try {
      const token = getState().auth.token;
      console.log(token);
      const response = await axios.post(
        `${baseURL}cart/add/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /* addToCart: (state, { payload: { product, qty } }) => {
      const item = state.cartItems.find((item) => item.id === product.id);
      if (item) {
        item.qty += qty;
        item.subtotal += product.price * qty;
      } else {
        state.cartItems.push({
          ...product,
          qty: qty,
          subtotal: product.price * qty,
        });
      }
      state.cartQty += qty;
    }, */
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartQty -= action.payload.qty || 1;
    },
    /*     increaseCartQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.qty++;
        state.cartQty++;
      }
    }, */
    /*     decreaseCartQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item && item.qty > 1) {
        item.qty--;
        state.cartQty--;
      }
    }, */
    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalPrice = 0;
      state.cartQty = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart.items;
        state.cartTotalCost = action.payload.cart.totalCost;
        state.cartQty = action.payload.cart.totalQty;
        state.status = 'succeeded';
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const filteredCartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload.productId
        );
        state.cartItems = filteredCartItems;
      })
      .addCase(removeFromCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(clearCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateCartQuantityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // find where the position where item is in the list
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product._id === action.payload.product._id
        );
        state.cartItems[itemIndex].quantity = action.payload.quantity;
        state.cartTotalCost = action.payload.totalCost;
      })
      .addCase(updateCartQuantityAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async ({ productId }, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.delete(
        `${baseURL}cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error removing in  server: ', error.message);
      throw error;
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.delete(`${baseURL}cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error.message);
      throw error;
    }
  }
);

export const updateCartQuantityAsync = createAsyncThunk(
  'cart/updateCartQuantityAsync',
  async ({ productId, action }, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.patch(
        `${baseURL}cart/update/${productId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating cart', error.message);
      throw error;
    }
  }
);

export const {
  addToCart,
  removeFromCart,
  increaseCartQty,
  decreaseCartQty,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
