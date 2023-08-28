"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { getCartProduct } from "@/redux/reducers/apiCartProducts";
import { valueFormatter } from "@/utils/formatter";
import { ProfileInfos } from "./components/ProfileInfos";
import { PaymentInfos } from "./components/PaymentInfos";
import { ShippingInfos } from "./components/ShippingInfos";
import { AddressInfos } from "./components/AdressInfos";
import Image from "next/image";
import "./styles.scss";

export default function Checkout() {
  const dispatch = useAppDispatch();

  const checkoutProducts = useSelector(
    (state: RootState) => state.cartProduct.cartProduct
  );

  useEffect(() => {
    dispatch(getCartProduct());
  }, [dispatch]);

  function calculateAndShowTotalPrice() {
    let totalPrice = 0;

    checkoutProducts.forEach((product) => {
      const value = product.salePrice ? product.salePrice : product.price;
      product.quantity !== 0
        ? (totalPrice += value * product.quantity)
        : (totalPrice += value);
    });

    const formattedTotalPrice = valueFormatter(totalPrice);

    return `Total: ${formattedTotalPrice}`;
  }

  return (
    <main className="container">
      <div className="checkout-infos">
        <ProfileInfos />
        <AddressInfos />
        <ShippingInfos />
        <PaymentInfos />
      </div>
      <aside className="checkout-product-infos">
        {checkoutProducts.map((product) => {
          return (
            <div className="product-infos" key={product.id}>
              <Image
                className="img-product"
                src={product.imageUrl}
                width={100}
                height={100}
                alt=""
              />
              <div className="infos">
                <strong>{product.product}</strong>
                <span>Quantidade: {product.quantity}</span>
                {product.salePrice ? (
                  <div className="product-promotion-sale-price">
                    <span>{valueFormatter(product.price)}</span>
                    <span>{valueFormatter(product.salePrice)}</span>
                  </div>
                ) : (
                  <span>{valueFormatter(product.price)}</span>
                )}
              </div>
            </div>
          );
        })}
        <div className="buy-button">
          <span>{calculateAndShowTotalPrice()}</span>
          <button>Finalizar Compra</button>
        </div>
      </aside>
    </main>
  );
}
