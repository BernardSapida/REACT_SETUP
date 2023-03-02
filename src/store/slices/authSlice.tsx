import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    signedIn: false,
  },
  reducers: {
    signin(state) {
      state.signedIn = true;
    },
    signout(state) {
      console.log("Signing out");
      state.signedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
