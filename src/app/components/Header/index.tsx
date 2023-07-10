"use client";

import { useState } from "react";
import { User } from "@/types/User";
import { UserIsLogged } from "./components/userIsLogged";
import UserModal from "./components/userModal";
import MiniCart from "./components/miniCart";
import { useSelector } from "react-redux";
import Link from "next/link";
import {RootState } from "@/redux/store";
import { BsCart2, BsSearch } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import "./styles.scss";

export default function Header() {
  const [userLoginModalIsOpen, setUserLoginModalIsOpen] = useState(false);
  const [miniCartModalIsOpen, setMiniCartModalIsOpen] = useState(false);
  const [userLogged, setUserLogged] = useState<User | null>(null);

  const products = useSelector(
    (state: RootState) => state.cartProduct.cartProduct
  );

  function getUserLogged(user: User) {
    setUserLogged(user);
  }

  function handleCloseModal() {
    setUserLoginModalIsOpen(false);
  }

  function handleCloseMiniCart() {
    setMiniCartModalIsOpen(false);
  }

  return (
    <div className="header">
      <h1>Ecommerce.GG</h1>
      <div className="icons">
        <BsSearch size={20} />

        {products.length === 0 ? (
          <BsCart2 size={22} onClick={() => setMiniCartModalIsOpen(true)} />
        ) : (
          <Link href="./Cart">
            <BsCart2 size={22} />
          </Link>
        )}

        {miniCartModalIsOpen && (
          <MiniCart
            isOpen={miniCartModalIsOpen}
            onClose={handleCloseMiniCart}
          />
        )}

        {userLogged !== null ? (
          <UserIsLogged username={userLogged} />
        ) : (
          <AiOutlineUser
            size={22}
            onClick={() => setUserLoginModalIsOpen(true)}
          />
        )}

        {userLoginModalIsOpen && (
          <UserModal
            isOpen={userLoginModalIsOpen}
            onClose={handleCloseModal}
            onGetUserIsLogged={getUserLogged}
          />
        )}
      </div>
    </div>
  );
}
