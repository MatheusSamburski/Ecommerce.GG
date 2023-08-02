"use client";
import { useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { getCartProduct } from "@/redux/reducers/apiCartProducts";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModalCart } from "@/redux/actions/actions";
import {
  AiOutlineTag,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineClose,
} from "react-icons/ai";
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

  function showTotalPriceInCart() {
    let totalPrice = 0;

    products.forEach((product) => {
      const value = product.price;
      totalPrice += value;
    });

    const formattedTotalPrice = totalPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

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
            Seu carrinho tem <strong>X itens</strong>
          </div>

          <AiOutlineClose />
        </header>
        <main className="container-products">
          {products?.map((product) => {
            return (
              <>
                <div className="item" key={product.product}>
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
                        <button className="sub">
                          <AiOutlineMinus />
                        </button>

                        <span>1</span>
                        <button className="add">
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <div className="price">R$ {product.price}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </main>
        <footer>
          <div className="total">
            <span>Total:</span>
            <strong>{showTotalPriceInCart()}</strong>
          </div>

          <div className="cupom">
            <AiOutlineTag />
            <span>Adicionar cupom</span>
          </div>

          <Link href="/Cart">
            <button>Finalizar compra</button>
          </Link>
        </footer>
      </div>
    </ReactModal>
  );
}
