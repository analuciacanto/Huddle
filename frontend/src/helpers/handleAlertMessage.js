import displayToaster from './displayToaster';

const handleAlertMessage = (...messages) => {
  const timestamp = Date.now();
  messages.forEach((message) =>
  {
    const { sensorId, data } = message;
    const { alertType, text } = data;
    const alertMessage = text ? text : `Alerta tipo ${alertType}`;
    displayToaster(sensorId, alertType, alertMessage, timestamp);
  });
};

export default handleAlertMessage;
