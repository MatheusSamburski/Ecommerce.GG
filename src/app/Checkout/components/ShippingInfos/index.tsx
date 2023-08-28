"use client";
import { useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./styles.scss";

export function ShippingInfos() {
  const [dropdownShippingHidden, setDropdownShippingHidden] = useState(false);

  return (
    <>
      <div
        className="shipping-infos"
        onClick={() => setDropdownShippingHidden(!dropdownShippingHidden)}
      >
        <LiaShippingFastSolid />
        Opções de envio
        <MdOutlineKeyboardArrowUp
          size={20}
          className={`icon ${dropdownShippingHidden && "rotate"}`}
        />
      </div>
      <div
        className={`dropdown-shipping-infos ${
          dropdownShippingHidden ? "block" : "hidden"
        }`}
      >
        <div className="shipping-option-container">
          <input type="checkbox" />
          <div>
            <h3>Sedex</h3>
            <span>
              Previsão de entregada em até 2 meses - <strong>R$ 65,90</strong>
            </span>
          </div>
        </div>
        <div className="shipping-option-container">
          <input type="checkbox" />
          <div>
            <h3>AlienExpress</h3>
            <span>
              Previsão de entregada em até 2 SEMANAS - <strong>R$ 5,50</strong>
            </span>
          </div>
        </div>
        <div className="shipping-option-container">
          <input type="checkbox" />
          <div>
            <h3>A pé</h3>
            <span>
              Previsão de entregada em até 1 mês - <strong>R$ 10,00</strong>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
