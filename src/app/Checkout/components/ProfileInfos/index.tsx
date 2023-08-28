"use client";
import { GoPerson } from "react-icons/go";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import "./styles.scss";

export function ProfileInfos() {
  const [dropdownProfileHidden, setDropdownProfileHidden] = useState(true);

  return (
    <>
      <div
        className="profile-infos"
        onClick={() => setDropdownProfileHidden(!dropdownProfileHidden)}
      >
        <GoPerson size={20} />
        <h3>Informações pessoais</h3>
        <MdOutlineKeyboardArrowUp
          size={20}
          className={`icon ${dropdownProfileHidden && "rotate"}`}
        />
      </div>
      <div
        className={`dropdown-profile-infos ${
          dropdownProfileHidden ? "block" : "hidden"
        }`}
      >
        <div className="profile-container-infos">
          <span>Nome: Matheus</span>
          <span>CPF: 111.222.333-44</span>
          <span>Telefone: (41) 99560-8903</span>
          <span>Email: mateus41789@gmail.com</span>
        </div>
      </div>
    </>
  );
}
