import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import coinFollowSlice from './coinFollowSlice';

const rootReducer = {
  theme: themeSlice,
  coinFollow: coinFollowSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
