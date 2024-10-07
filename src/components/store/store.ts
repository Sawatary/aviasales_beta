import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filterSlice";
import ticketsReducer from "./ticketsApi";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
