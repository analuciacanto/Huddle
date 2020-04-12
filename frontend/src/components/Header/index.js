import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineHome, AiOutlineBarChart } from 'react-icons/ai';

import settings from '../../settings';

import './styles.css';

const Header = () => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <header className="header-container">
      <div className="content">
        <h1>{settings.DASHBOARD_NAME}</h1>
      </div>
      <div className="left-button-container">
        <Link className="button-link" to="/" title="Página Incial">
          <AiOutlineHome size={32} />
        </Link>
        <Link className="button-link" to="/charts" title="Gráficos Barra">
          <AiOutlineBarChart size={32} />
        </Link>
      </div>
      <div className="clock-container">
        <h2>{clock}</h2>
      </div>
    </header>
  );
};

export default Header;
