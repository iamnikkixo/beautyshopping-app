import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/home/categoriesSlice';
import { productsReducer } from '../features/products/productsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { authReducer } from '../features/auth/authSlice';
import { checkoutReducer } from '../features/actions/checkoutSlice';

// async storage to persist
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
};

export const store = configureStore({
  reducer: persistCombineReducers(config, {
    categories: categoriesReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
