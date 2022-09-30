import { createSlice } from '@reduxjs/toolkit';

const sessionData = sessionStorage.getItem('bank');

const bankSlice = createSlice({
  name: 'bank',
  initialState: JSON.parse(sessionData) || [],
  reducers: {
    updateBank: (state, action) => {
      sessionStorage.setItem('bank', JSON.stringify(action.payload));

      return action.payload;
    },
  }
});

export const { updateBank } = bankSlice.actions;

export default bankSlice.reducer;
