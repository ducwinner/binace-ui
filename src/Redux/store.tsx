import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import coinFollowSlice from './coinFollowSlice';
import coinReducer from './CoinApiSlice';
import fortfolioSlice from './fortfolioSlice';

const rootReducer = {
  theme: themeSlice,
  coinFollow: coinFollowSlice,
  listCoinApi: coinReducer,
  fortfolio: fortfolioSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
