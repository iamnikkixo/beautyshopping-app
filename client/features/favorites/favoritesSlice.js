import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesArray: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.favoritesArray.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.favoritesArray.splice(index, 1);
      } else {
        state.favoritesArray.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
