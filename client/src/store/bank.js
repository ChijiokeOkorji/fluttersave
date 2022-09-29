import { createSlice } from '@reduxjs/toolkit';

const localData = localStorage.getItem('bank');

const bankSlice = createSlice({
  name: 'bank',
  initialState: JSON.parse(localData) || [],
  reducers: {
    updateBank: (state, action) => {
      localStorage.setItem('bank', JSON.stringify(action.payload));

      return action.payload;
    },
  }
});

export const { updateBank } = bankSlice.actions;

export default bankSlice.reducer;
