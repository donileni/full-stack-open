import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      return action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions

export default userSlice.reducer
