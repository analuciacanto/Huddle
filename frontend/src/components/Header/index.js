import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineHome
} from "react-icons/ai";
import Cookies from "universal-cookie";

import coppeImg from "../../assets/coppe.png";
import "./styles.css";

const Header = () => {
  const cookies = new Cookies();
  const [authenticated, setAuthenticated] = useState(false);
  const [clock, setClock] = useState("");
  const DASHBOARD_NAME = "HUDDLE/UFRJ";

  const handleLogout = (event) => {
    event.preventDefault();
    cookies.remove("user");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date().toLocaleTimeString("pt-BR"));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    if (cookies.get("user")) setAuthenticated(true);
    else setAuthenticated(false);
  }, [cookies.get("user")]);

  return (
    <header className="header-container">
      <div className="content">
        <h1>{DASHBOARD_NAME}</h1>
      </div>
      <div className="left-items-container">
        <img src={coppeImg} alt="coppe" />      
        <div className="left-button-container">
          <Link className="button-link" to="/" title="Página Incial">
            <AiOutlineHome size={32} />
          </Link>
          </div>
      </div>
      {authenticated ? (
        <div className="login-container">
          <Link
            className="button-link"
            to="/"
            title="Logout"
            onClick={handleLogout}
          >
            <AiOutlineLogout size={32} />
          </Link>
        </div>
      ) : (
        <div className="login-container">
          <Link className="button-link" to="/login" title="Login">
            <AiOutlineLogin size={32} />
          </Link>
        </div>
      )}
      <div className="clock-container">
        <h2>{clock}</h2>
      </div>
    </header>
  );
};

export default Header;
