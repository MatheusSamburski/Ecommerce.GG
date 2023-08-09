import { productsApi } from "@/lib/axios";
import { ProductProps } from "@/types/Products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface ProductState {
  cartProduct: any[];
}

const initialState: ProductState = {
  cartProduct: [],
};

export const getCartProduct = createAsyncThunk(
  "cartProducts/getCartProducts",
  async () => {
    const response = await productsApi.get("/cartProducts");
    return response.data;
  }
);

export const postProductToCart = createAsyncThunk(
  "cartProducts/postCartProducts",
  async (product: ProductProps) => {
    await productsApi.post("/cartProducts", {
      id: Math.random(),
      product: product.product,
      imageUrl: product.imageUrl,
      salePrice: product.salePrice,
      quantity: 1,
      price: product.price,
    });
  }
);

export const deleteProductToCart = createAsyncThunk(
  "cartProducts/deleteCartProducts",
  async (id: number) => {
    await productsApi.delete(`/cartProducts/${id}`);
  }
);

export const updatedProductToCart = createAsyncThunk(
  "cartProducts/updateCartProducts",
  async ({ id, newQuantity }: { id: number, newQuantity: number }) => {
    const response = await productsApi.get(`/cartProducts/${id}`);
    const updatedProduct = {
      ...response.data,
      quantity: newQuantity,
    };
    await productsApi.put(`/cartProducts/${id}`, updatedProduct);
    return updatedProduct;
  }
);


const productsCartSlice = createSlice({
  name: "productsCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartProduct.fulfilled, (state, action) => {
      state.cartProduct = action.payload;
    });
    builder.addCase(postProductToCart.fulfilled, (state, action) => {
      action.payload;
    });
    builder.addCase(deleteProductToCart.fulfilled, (state, action) => {
      action.payload;
    });
    builder.addCase(updatedProductToCart.fulfilled, (state, action) => {
      action.payload;
    })
  },
});

export default productsCartSlice.reducer;
