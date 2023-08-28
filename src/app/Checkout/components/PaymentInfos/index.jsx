"use-client";
import { BsCreditCard2Back, BsCreditCard } from "react-icons/bs";
import { MdPix, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useState } from "react";
import "./styles.scss";

export function PaymentInfos() {
  const [dropdownPaymentHidden, setDropdownPaymentHidden] = useState(false);

  return (
    <>
      <div
        className="payment-infos"
        onClick={() => setDropdownPaymentHidden(!dropdownPaymentHidden)}
      >
        <BsCreditCard2Back />
        <h3>Forma de pagamento</h3>
        <MdOutlineKeyboardArrowUp
          size={20}
          className={`icon ${dropdownPaymentHidden && "rotate"}`}
        />
      </div>
      <div
        className={`dropdown-payment-infos ${
          dropdownPaymentHidden ? "block" : "hidden"
        }`}
      >
        <div className="pix-payment">
          <input type="checkbox" name="pix" />
          <MdPix />
          <label htmlFor="pix">Pix</label>
        </div>
        <div className="card-payment">
          <input type="checkbox" name="pix" />
          <BsCreditCard />
          <label htmlFor="pix">Cartão</label>
        </div>
        <div className="ticket-payment">
          <input type="checkbox" name="pix" />
          <LuFileSpreadsheet />
          <label htmlFor="pix">Boleto</label>
        </div>
      </div>
    </>
  );
}
