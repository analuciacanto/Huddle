import displayToaster from './displayToaster';

const handleAlertMessage = (...messages) => {
  const timestamp = Date.now();
  messages.forEach((m) =>
  {
    const { sensorId, data } = m;
    const { alertType, message } = data;
    const alertMessage = message ? message : `Alerta tipo ${alertType}`;
    displayToaster(sensorId, alertType, alertMessage, timestamp);
  });
};

export default handleAlertMessage;
