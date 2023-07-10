import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/apiProducts";
import productCartReducer from "./reducers/apiCartProducts";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cartProduct: productCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;