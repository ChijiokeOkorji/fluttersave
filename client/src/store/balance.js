import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: '',
  reducers: {
    update: (state, action) => action.payload,
  }
});

export const { update } = balanceSlice.actions;

export default balanceSlice.reducer;
