import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "@/features/flightSlice";
import queryReducer from "@/features/querySlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    query: queryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
