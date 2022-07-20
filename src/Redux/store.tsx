import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import coinFollowSlice from './coinFollowSlice';
import coinReducer from './CoinApiSlice';
import fortfolioSlice from './fortfolioSlice';
import userSlice from './authSlice';

const rootReducer = {
  theme: themeSlice,
  coinFollow: coinFollowSlice,
  listCoinApi: coinReducer,
  fortfolio: fortfolioSlice,
  user: userSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
