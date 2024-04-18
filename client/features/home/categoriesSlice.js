import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: 0, name: 'Popular' },
    { id: 1, name: 'All' },
    { id: 2, name: 'Aromatherapy' },
    { id: 3, name: 'Skincare' },
    { id: 4, name: 'Bath & Body' },
    { id: 5, name: 'Hair Care' },
    { id: 6, name: 'Gift Sets' },
  ],
  selectedCategory: 'Popular',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
