import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../Filter/filterSlice";
import ticketsReducer from "../Tickets/ticketsSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
