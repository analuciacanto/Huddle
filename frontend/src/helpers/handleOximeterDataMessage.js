import store from '../store';
import { sensorDataReceived } from '../actions';

const handleOximeterDataMessage = (...messages) => {
  const timestamp = Date.now();
  messages.forEach((message) =>
  {
    const { sensorId, data } = message;
    const { beat, spo2, temp } = data;
    const sensorData = { beat, spo2, temp, timestamp };
    sensorData.temp = temp.toFixed(1);
    store.dispatch(sensorDataReceived({ sensorId, sensorData }));
  });
};

export default handleOximeterDataMessage;
