"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { getCartProduct } from "@/redux/reducers/apiCartProducts";
import "./styles.scss";

export default function Cart() {
  const dispatch = useAppDispatch();

  const checkoutProducts = useSelector(
    (state: RootState) => state.cartProduct.cartProduct
  );

  useEffect(() => {
    dispatch(getCartProduct());
  }, [dispatch]);

  return (
    <main className="container">
      <div>Checkout Infos</div>
      <aside className="checkout-product-infos">Product infos</aside>
    </main>
  );
}
/* <Link href="/">Voltar a Home</Link> */
