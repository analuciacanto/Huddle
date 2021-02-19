import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mqtt from 'mqtt';

import Routes from './routes';
import { updateHospitalBeds } from './actions';
import { BROKER_URL, OXIMETERS_TOPIC } from 'settings';

import handleBrokerConnect from './helpers/handleBrokerConnect';
import handleBrokerMessage from './helpers/handleBrokerMessage';

import './global.css';

const App = ({ updateHospitalBeds }) => {
  useEffect(() => {
    updateHospitalBeds();
  });

  useEffect(() => {
    const client = mqtt.connect(BROKER_URL);

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
