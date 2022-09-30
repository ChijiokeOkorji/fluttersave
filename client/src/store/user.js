import { createSlice } from '@reduxjs/toolkit';

const sessionData = sessionStorage.getItem('user');

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(sessionData) || {},
  reducers: {
    login: (state, action) => {
      sessionStorage.setItem('user', JSON.stringify(action.payload));

      return action.payload;
    },
    logout: (state, action) => {
      sessionStorage.clear();

      return ({});
    },
  }
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
