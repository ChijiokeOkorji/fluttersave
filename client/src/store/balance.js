import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: '',
  reducers: {
    updateBalance: (state, action) => action.payload,
  }
});

export const { updateBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
