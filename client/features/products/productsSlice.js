import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../assets/shared/baseURL';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(baseURL + 'products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
  }
);

const initialState = {
  productsArray: [],
  recentProducts: [],
  filteredProductsArray: [],
  currentCategory: 'popular',
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProductsByCategory: (state, action) => {
      const category = action.payload.toLowerCase();
      state.currentCategory = category;

      if (category === 'all') {
        state.filteredProductsArray = state.productsArray;
      } else {
        const filteredProducts = state.productsArray.filter(
          (product) => product.category && product.category.includes(category)
        );
        state.filteredProductsArray = filteredProducts;
      }
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase().split(' ');
      if (!searchTerm.length) {
        state.filteredProductsArray = state.productsArray;
      } else {
        const filteredProducts = state.productsArray.filter((product) =>
          searchTerm.some((term) => product.about.toLowerCase().includes(term))
        );
        state.filteredProductsArray = filteredProducts;
      }
    },
    clearSearch: (state, action) => {
      const category = state.currentCategory;
      if (category === 'all') {
        state.filteredProductsArray = state.productsArray;
      } else {
        const filteredProducts = state.productsArray.filter(
          (product) => product.category && product.category.includes(category)
        );
        state.filteredProductsArray = filteredProducts;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsArray = action.payload;
        state.recentProducts = action.payload.filter((product) => product.new);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectProductsByCategory, searchProducts, clearSearch } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
