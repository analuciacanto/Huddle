import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";

import Routes from './routes';
import { updateHospitalBeds } from './actions';
import { MANAGER_PROTOCOL, MANAGER_IP, MANAGER_PORT, MANAGER_NAMESPACE, OXIMETERS_MESSAGE, ALERTS_MESSAGE } from 'settings';

import handleManagerConnect from './helpers/handleManagerConnect';
import handleOximeterDataMessage from './helpers/handleOximeterDataMessage';
import handleAlertMessage from './helpers/handleAlertMessage';

import './global.css';

const App = ({ updateHospitalBeds }) => {
  useEffect(() => {
    updateHospitalBeds();
  });

  useEffect(() => {
    console.log("useEffect");
    const client = io(`${MANAGER_PROTOCOL}://${MANAGER_IP}:${MANAGER_PORT}/${MANAGER_NAMESPACE}`);
    
    //client.subscribe(OXIMETERS_TOPIC);

    client.on('connection', handleManagerConnect);

    client.on(OXIMETERS_MESSAGE, handleOximeterDataMessage);
    
    client.on(ALERTS_MESSAGE, handleAlertMessage);
  }, []);

  return <Routes />;
};

export default connect(null, { updateHospitalBeds })(App);
