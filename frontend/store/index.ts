import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "@/features/flightSlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
  },
});

// Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
