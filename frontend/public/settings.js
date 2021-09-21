const settings = {

  DASHBOARD_NAME: 'Oximetro IoT UFRJ',
  MANAGER_PROTOCOL: 'ws',
  MANAGER_IP: 'localhost',
  MANAGER_PORT: 40164,
  MANAGER_NAMESPACE: 'dashboard',
  OXIMETERS_MESSAGE: 'new_stat',
  ALERTS_MESSAGE: 'alert',
  RECORDS_TO_SAVE: 500,
  MINUTES_TO_EXPIRE: 1,
  // TODO - Paulo Mattos - Adicionar aqui novos leitos quando a mensagem for recebida
  HOSPITAL_BEDS: [
    { name: 'HUCFF_01', sensor_id: 1 },
    { name: 'IPPMG_01', sensor_id: 2 },
    { name: 'CASA_01', sensor_id: 3 },
    { name: 'CASA_02', sensor_id: 4 },
    { name: 'CASA_03', sensor_id: 5 },
    { name: 'CASA_04', sensor_id: 6 },
    { name: 'CASA_05', sensor_id: 7 },
    { name: 'CASA_06', sensor_id: 8 },
    { name: 'CASA_07', sensor_id: 9 },
    { name: 'CASA_08', sensor_id: 10 },
  ],
  REPORT_INTERVAL_MINUTES: 60,
};
