import { createSlice } from '@reduxjs/toolkit';

const localData = localStorage.getItem('user');

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localData) || {},
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));

      return action.payload;
    },
    logout: (state, action) => {
      localStorage.clear();

      return ({});
    },
  }
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
