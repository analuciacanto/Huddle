import React, { useEffect } from 'react';
import io from "socket.io-client";

import Routes from './routes';
import { MANAGER_PROTOCOL, MANAGER_IP, MANAGER_PORT, MANAGER_NAMESPACE, OXIMETERS_MESSAGE, ALERTS_MESSAGE, CONFIGURATION_MESSAGE } from 'settings';

import handleManagerConnect from './helpers/handleManagerConnect';
import handleOximeterDataMessage from './helpers/handleOximeterDataMessage';
import handleAlertMessage from './helpers/handleAlertMessage';
import handleConfigurationMessage from './helpers/handleConfigurationMessage';

import './global.css';

const App = () => {

  useEffect(() => {
    const client = io(`${MANAGER_PROTOCOL}://${MANAGER_IP}:${MANAGER_PORT}/${MANAGER_NAMESPACE}`);
    
    //client.subscribe(OXIMETERS_TOPIC);

    client.on('connect', () => handleManagerConnect(client));

    client.on(OXIMETERS_MESSAGE, handleOximeterDataMessage);
    
    client.on(ALERTS_MESSAGE, handleAlertMessage);

    client.on(CONFIGURATION_MESSAGE, handleConfigurationMessage);
  }, []);

  return <Routes />;
};

export default App;
