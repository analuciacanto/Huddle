import store from '../store';
import { sensorDataReceived } from '../actions';
import { OXIMETERS_TOPIC, ALERTS_TOPIC } from 'settings';
import displayToaster from './displayToaster';

const handleBrokerMessage = (topic, payload) => {
  const [baseTopic, sensorId] = topic.split('/');
  const timestamp = Date.now();
  switch (baseTopic) {
    case ALERTS_TOPIC: {
      const { alertType, message } = JSON.parse(payload.toString());
      const alertMessage = message ? message : `Alerta tipo ${alertType}`;
      displayToaster(sensorId, alertType, alertMessage, timestamp);
      break;
    }
    case OXIMETERS_TOPIC: {
      const { beat, spo2, temp } = JSON.parse(payload.toString());
      const sensorData = { beat, spo2, temp, timestamp };
      sensorData.temp = temp.toFixed(1);
      store.dispatch(sensorDataReceived({ sensorId, sensorData }));
      break;
    }
    default: {
      break;
    }
  }
};

export default handleBrokerMessage;
