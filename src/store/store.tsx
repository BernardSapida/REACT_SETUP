import { configureStore } from "@reduxjs/toolkit";

// Slices
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
