"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserModal from "./components/userModal";
import MiniCart from "./components/miniCart";
import { UserIsLogged } from "./components/userIsLogged";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { openModal, openModalCart } from "@/redux/actions/actions";
import { BsCart2, BsSearch } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { getCartProduct } from "@/redux/reducers/apiCartProducts";
import { User } from "@/types/User";
import "./styles.scss";

export default function Header() {
  const [cartIsEmpty, setCartIsEmpty] = useState(false);

  const dispatch = useAppDispatch();
  const isModalLoginOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const isModalCartOpen = useSelector(
    (state: RootState) => state.modal.isModalCartOpen
  );

  const [userLogged, setUserLogged] = useState<User | null>(null);
  const products = useSelector(
    (state: RootState) => state.cartProduct.cartProduct
  );

  useEffect(() => {
    dispatch(getCartProduct());
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      setCartIsEmpty(true);
    } else {
      setCartIsEmpty(false);
    }
  }, [products]);

  function getUserLogged(user: User) {
    setUserLogged(user);
  }

  return (
    <div className="header">
      <h1>Ecommerce.GG</h1>
      <div className="icons">
        <BsSearch size={20} />

        {cartIsEmpty ? (
          <Link href="./Cart">
            <BsCart2 size={22} />
          </Link>
        ) : (
          <div className="content-icon-cart-and-qty">
            <BsCart2 size={22} onClick={() => dispatch(openModalCart())} />
            <span>{products.length}</span>
          </div>
        )}

        {isModalCartOpen && <MiniCart isOpen={isModalCartOpen} />}

        {userLogged !== null ? (
          <UserIsLogged username={userLogged} />
        ) : (
          <AiOutlineUser size={22} onClick={() => dispatch(openModal())} />
        )}

        {isModalLoginOpen && (
          <UserModal
            isOpen={isModalLoginOpen}
            onGetUserIsLogged={getUserLogged}
          />
        )}
      </div>
    </div>
  );
}
