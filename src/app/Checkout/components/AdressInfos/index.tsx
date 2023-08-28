"use client";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./styles.scss";

export function AddressInfos() {
  const [dropdownAddressHidden, setDropdownAddressHidden] = useState(false);

  return (
    <>
      <div
        className="address-infos"
        onClick={() => setDropdownAddressHidden(!dropdownAddressHidden)}
      >
        <AiOutlineHome />
        Endereço de entrega
        <MdOutlineKeyboardArrowUp
          size={20}
          className={`icon ${dropdownAddressHidden && "rotate"}`}
        />
      </div>
      <div
        className={`dropdown-address-infos ${
            dropdownAddressHidden ? "block" : "hidden"
        }`}
      >
        <div className="address-container-infos">
          <span>Matheus Samburski</span>
          <span>Rua das Margaridas, 50</span>
          <span>Campo de Santana</span>
          <span>PR</span>
        </div>
      </div>
    </>
  );
}
