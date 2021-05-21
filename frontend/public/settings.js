const settings = {

  DASHBOARD_NAME: 'Oximetro IoT UFRJ',
  BROKER_PROTOCOL: 'ws',
  BROKER_IP: 'k3s.cos.ufrj.br',
  BROKER_PORT: 30364,
  BROKER_URL_PATH: '/ws',
  BROKER_LOGIN: 'admin',
  BROKER_PASSWORD: '.123qwe',
  OXIMETERS_TOPIC: 'oximeters',
  ALERTS_TOPIC: 'alerts',
  RECORDS_TO_SAVE: 500,
  MINUTES_TO_EXPIRE: 1,
  HOSPITAL_BEDS: [
    { name: 'HUCFF_01', sensor_id: 1 },
    { name: 'IPPMG_01', sensor_id: 2 },
    { name: 'CASA_01', sensor_id: 3 },
  ],
  REPORT_INTERVAL_MINUTES: 60,
};
