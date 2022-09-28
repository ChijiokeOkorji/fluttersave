import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user";
import balanceReducer from "./balance";

const reducer = {
  user: userReducer,
  balance: balanceReducer
};
const store = configureStore({ reducer });

export default store ;
