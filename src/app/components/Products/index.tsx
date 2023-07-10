"use client";
import Image from "next/image";
import "./styles.scss";
import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../redux/reducers/apiProducts";
import { AppDispatch, RootState } from "@/redux/store";
import { productsApi } from "@/lib/axios";
import { randomUUID } from "crypto";

interface productProps {
  id: number;
  product: string;
  imageUrl: string;
  salePrice: number;
  price: number;
}

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const listProducts = useSelector((state: RootState) => state.product.product);
  const [cartProducts, setCartProducts] = useState<productProps>({
    id: 0,
    product: "",
    imageUrl: "",
    salePrice: 0,
    price: 0,
  });

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  function handleAddProductToCart(product: productProps) {
    setCartProducts({
      id: Math.random(),
      product: product.product,
      imageUrl: product.imageUrl,
      salePrice: product.salePrice,
      price: product.price,
    });
  }

  useEffect(() => {
    if (cartProducts.product !== "") {
      productsApi
        .post("/cartProducts", cartProducts)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [cartProducts]);

  return (
    <div>
      <main className="product-boxes">
        {listProducts?.map((product) => {
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
                  onClick={() => handleAddProductToCart(product)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
}
