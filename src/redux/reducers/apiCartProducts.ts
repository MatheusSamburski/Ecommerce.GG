import { productsApi } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  cartProduct: any []
}

const initialState: ProductState = {
  cartProduct: [],
}

export const getCartProduct = createAsyncThunk("cartProducts/getCartProducts", async () => {
  const response = await productsApi.get("/cartProducts");
  return response.data;
});

const productsCartSlice = createSlice({
  name: "productsCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartProduct.fulfilled, (state, action) => {
      state.cartProduct = action.payload
    });
  },
});

export default productsCartSlice.reducer;