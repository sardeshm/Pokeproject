import React from "react";
import { NavLink } from "react-router-dom";
const MyNavbar = () => {
  return (
    <div className="Navbar">
      <NavLink
        to="/"
        activeStyle={{
          color: "dark-blue",
          textDecoration: "none",
        }}
      >
        PokeDex
      </NavLink>
      <a
        href="https://www.freeiconspng.com/img/27030"
        title="Image from freeiconspng.com"
      >
        <img
          src="https://www.freeiconspng.com/uploads/pokeball-icon-0.png"
          width="50"
          alt="Svg Free Pokeball"
        />
      </a>
      <NavLink
        to="/battle"
        activeStyle={{
          color: "dark-blue",
          textDecoration: "none",
        }}
      >
        PokeFight
      </NavLink>
    </div>
  );
};

export default MyNavbar;
