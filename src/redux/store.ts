import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/apiProducts";
import productCartReducer from "./reducers/apiCartProducts";
import modalReducer from "./reducers/modals";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cartProduct: productCartReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
