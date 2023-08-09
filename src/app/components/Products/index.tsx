"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getProduct } from "../../../redux/reducers/apiProducts";
import { RootState, useAppDispatch } from "@/redux/store";
import { ProductProps } from "@/types/Products";
import { postProductToCart } from "@/redux/reducers/apiCartProducts";
import { valueFormatter } from "../../../utils/formatter";
import "./styles.scss";

export default function Products() {
  const dispatch = useAppDispatch();
  const listProducts = useSelector((state: RootState) => state.product.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  function handleAddProductToCart(product: ProductProps) {
    dispatch(postProductToCart(product));
    alert("Produto adicionado ao carrinho com sucesso!");
  }

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
                    <span>{valueFormatter(product.price)}</span>
                    <span>{valueFormatter(product.salePrice)}</span>
                  </div>
                ) : (
                  <span>{valueFormatter(product.price)}</span>
                )}
                <button
                  className="button-add-to-cart"
                  type="button"
                  onClick={() => handleAddProductToCart(product)}
                >
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
}
