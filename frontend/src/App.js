import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mqtt from 'mqtt';

import Routes from './routes';
import { updateHospitalBeds } from './actions';
import { BROKER_PROTOCOL, BROKER_IP, BROKER_PORT, BROKER_URL_PATH, BROKER_LOGIN, BROKER_PASSWORD, OXIMETERS_TOPIC } from 'settings';

import handleBrokerConnect from './helpers/handleBrokerConnect';
import handleBrokerMessage from './helpers/handleBrokerMessage';

import './global.css';

const App = ({ updateHospitalBeds }) => {
  useEffect(() => {
    updateHospitalBeds();
  });

  useEffect(() => {
    const options = {
      username: BROKER_LOGIN,
      password: Buffer.from(BROKER_PASSWORD),
      port: BROKER_PORT,
    };
    const client = mqtt.connect(`${BROKER_PROTOCOL}://${BROKER_IP}${BROKER_URL_PATH.startsWith('/') ? BROKER_URL_PATH : `/${BROKER_URL_PATH}`}`, options);

    client.subscribe(OXIMETERS_TOPIC);

    client.on('connect', () => {
      handleBrokerConnect(client);
    });

    client.on('message', (topic, message) => {
      handleBrokerMessage(topic, message);
    });
  }, []);

  return <Routes />;
};

export default connect(null, { updateHospitalBeds })(App);
