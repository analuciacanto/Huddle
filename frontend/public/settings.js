const settings = {

  DASHBOARD_NAME: 'Oximetro IoT UFRJ',
  BROKER_URL: 'ws://broker.hivemq.com:8000/mqtt',
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
