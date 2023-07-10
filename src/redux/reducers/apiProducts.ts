import { productsApi } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  product: any []
}

const initialState: ProductState = {
  product: [],
}

export const getProduct = createAsyncThunk("products/getProducts", async () => {
  const response = await productsApi.get("/products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload
    });
  },
});

export default productsSlice.reducer;
