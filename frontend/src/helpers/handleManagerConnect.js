const handleManagerConnect = (client) => {
  console.log("Connected");
  client.emit("request_configurations");
};

export default handleManagerConnect;
