"use client";
import { useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import {
  getCartProduct,
  deleteProductToCart,
  updatedProductToCart,
} from "@/redux/reducers/apiCartProducts";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModalCart } from "@/redux/actions/actions";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Trash } from "@phosphor-icons/react";
import { valueFormatter } from "@/utils/formatter";
import "./styles.scss";

export interface UserModalProps {
  isOpen: boolean;
}

export default function MiniCart({ isOpen }: UserModalProps) {
  const products = useSelector(
    (state: RootState) => state.cartProduct.cartProduct
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartProduct());
  }, [dispatch]);

  const customStyles = {
    content: {
      width: "500px",
      height: "100vh",
      backgroundColor: "var(--color-modal)",
      inset: "inherit",
      marginLeft: "auto",
      padding: "0",
      overflow: "hidden",
    },
  };

  function calculateAndShowTotalPrice() {
    let totalPrice = 0;

    products.forEach((product) => {
      const value = product.salePrice ? product.salePrice : product.price;
      product.quantity !== 0
        ? (totalPrice += value * product.quantity)
        : (totalPrice += value);
    });

    const formattedTotalPrice = valueFormatter(totalPrice);

    return formattedTotalPrice;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModalCart())}
      style={customStyles}
    >
      <div className="app">
        <header>
          <div>
            Seu carrinho tem{" "}
            <strong>
              {products.length} {products.length === 1 ? "item" : "itens"}
            </strong>
          </div>
        </header>
        <main className="container-products">
          {products?.map((product) => {
            return (
              <>
                <div className="item" key={product.id}>
                  <Image
                    width={150}
                    height={150}
                    src={product.imageUrl}
                    alt=""
                  />
                  <div className="details">
                    <h4 className="title">{product.product}</h4>
                    <div className="price-qty">
                      <div className="qty">
                        <button
                          className="sub"
                          onClick={() =>
                            dispatch(
                              updatedProductToCart({
                                id: product.id,
                                newQuantity: product.quantity - 1,
                              })
                            )
                          }
                        >
                          <AiOutlineMinus />
                        </button>
                        
                        <span>{product.quantity}</span>
                        <button
                          className="add"
                          onClick={() =>
                            dispatch(
                              updatedProductToCart({
                                id: product.id,
                                newQuantity: product.quantity + 1,
                              })
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <div className="price">
                        {product.salePrice ? valueFormatter(product.salePrice) : valueFormatter(product.price)}
                      </div>
                    </div>
                  </div>
                  <Trash
                    className="icon-delete"
                    size={32}
                    onClick={() => dispatch(deleteProductToCart(product.id))}
                  />
                </div>
              </>
            );
          })}
        </main>
        <footer>
          <div className="total">
            <span>Total:</span>
            <strong>{calculateAndShowTotalPrice()}</strong>
          </div>

          <Link href="/Checkout">
            <button onClick={() => dispatch(closeModalCart())}>
              Finalizar compra
            </button>
          </Link>
        </footer>
      </div>
    </ReactModal>
  );
}
