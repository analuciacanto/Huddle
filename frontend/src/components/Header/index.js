import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineBarChart, AiOutlineHistory } from 'react-icons/ai';

import coppeImg from '../../assets/coppe.png';
import './styles.css';

const Header = () => {

  const [clock, setClock] = useState('');
  const DASHBOARD_NAME = "HUDDLE/UFRJ"

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <header className="header-container">
      <div className="content">
        <h1>{DASHBOARD_NAME}</h1>
      </div>
      <div className="left-items-container">
        <img src={coppeImg} alt="coppe" />
        <div className="left-button-container">
          <Link className="button-link" to="/" title="Página Incial">
            <AiOutlineHome color="primary" size={32} />
          </Link>         
        </div>
      </div>
      <div className="clock-container">
        <h2>{clock}</h2>
      </div>
    </header>
  );
};

export default Header;
