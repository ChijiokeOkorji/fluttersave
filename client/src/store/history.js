import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    updateHistory: (state, action) => action.payload,
  }
});

export const { updateHistory } = historySlice.actions;

export default historySlice.reducer;
