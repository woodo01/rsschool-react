import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./slices/formsSlice";
import countriesReducer from "./slices/countriesSlice";

const store = configureStore({
  reducer: {
    forms: formsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
