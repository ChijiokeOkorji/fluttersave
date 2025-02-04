import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user";
import balanceReducer from "./balance";
import historyReducer from "./history";
import bankReducer from './banks';

const reducer = {
  user: userReducer,
  balance: balanceReducer,
  history: historyReducer,
  banks: bankReducer
};

const store = configureStore({ reducer });

export default store ;
