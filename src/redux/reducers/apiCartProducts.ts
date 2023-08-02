import { productsApi } from "@/lib/axios";
import { ProductProps } from "@/types/Products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface ProductState {
  cartProduct: any[]
}

const initialState: ProductState = {
  cartProduct: [],
}

export const getCartProduct = createAsyncThunk("cartProducts/getCartProducts", async () => {
  const response = await productsApi.get("/cartProducts");
  return response.data;
});

export const postProductToCart = createAsyncThunk(
  "cartProducts/postCartProducts",
  async (product: ProductProps) => {
    await productsApi.post("/cartProducts", {
      id: Math.random(),
      product: product.product,
      imageUrl: product.imageUrl,
      salePrice: product.salePrice,
      price: product.price,
    });
  }
);

const productsCartSlice = createSlice({
  name: "productsCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartProduct.fulfilled, (state, action) => {
      state.cartProduct = action.payload
    });
    builder.addCase(postProductToCart.fulfilled, (state, action) => {
      action.payload;
    })
  },
});

export default productsCartSlice.reducer;