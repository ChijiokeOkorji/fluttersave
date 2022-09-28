import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (state, action) => action.payload,
    logout: (state, action) => ({}),
  }
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
