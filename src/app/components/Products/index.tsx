"use client";
import Image from "next/image";
import "./styles.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProduct } from "../../../redux/reducers/apiProducts";
import { RootState, useAppDispatch } from "@/redux/store";
import { ProductProps } from "@/types/Products";
import { postProductToCart } from "@/redux/reducers/apiCartProducts";

export default function Products() {
  const dispatch = useAppDispatch();
  const listProducts = useSelector((state: RootState) => state.product.product);
  const [productAddedToCart, setProductAddedToCart] = useState(false);
  const [indexButton, setIndexButton] = useState("");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  function showTextProductAddedToCart(index: any) {
    if (index === indexButton) {
      return "Produto adicionado...";
    }

    setTimeout(() => {
      setProductAddedToCart(false);
    }, 2000);
  }

  function handleAddProductToCart(product: ProductProps, index: any) {
    dispatch(postProductToCart(product));
    setIndexButton(index);
    setProductAddedToCart(true);
    showTextProductAddedToCart(index);
  }

  return (
    <div>
      <main className="product-boxes">
        {listProducts?.map((product, index) => {
          return (
            <>
              <div className="product" key={product.id}>
                <Image
                  className="product-image"
                  width={150}
                  height={150}
                  src={product.imageUrl}
                  alt="imagem do produto"
                />
                <h3>{product.product}</h3>

                {product.salePrice ? (
                  <div className="product-sale-price">
                    <span>R$ {product.price}</span>
                    <span>R$ {product.salePrice}</span>
                  </div>
                ) : (
                  <span>R$ {product.price}</span>
                )}
                <button
                  className="button-add-to-cart"
                  type="button"
                  onClick={() => handleAddProductToCart(product, index)}
                >
                  <span>
                    {!productAddedToCart
                      ? "Adicionar ao carrinho"
                      : showTextProductAddedToCart(index)}
                  </span>
                </button>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
}
