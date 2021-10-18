import { mapKeys, camelCase } from 'lodash';

import { HOSPITAL_BEDS } from 'settings';
import { 
  SENSOR_DATA_RECEIVED, 
  SENSOR_DATA_CHECK, 
  DELETE_SENSOR_DATA, 
  RESET_HOSPITAL_BEDS,
  ADD_HOSPITAL_BED, 
  REMOVE_HOSPITAL_BED,
  UPDATE_HOSPITAL_BED} from './types';

export const sensorDataReceived = (data) => {
  return {
    type: SENSOR_DATA_RECEIVED,
    payload: data,
  };
};

export const sensorCheckData = (data) => {
  return {
    type: SENSOR_DATA_CHECK,
    payload: data,
  };
};

export const deleteSensorData = (data) => {
  return {
    type: DELETE_SENSOR_DATA,
    payload: data,
  };
};

export const addHospitalBed = (data) => {
  return {
    type: ADD_HOSPITAL_BED,
    payload: data,
  };
};

export const resetHospitalBeds = (data) => {
  return {
    type: RESET_HOSPITAL_BEDS,
    payload: data,
  };
};

export const removeHospitalBed = (id) => {
  return {
    type: REMOVE_HOSPITAL_BED,
    payload: id,
  };
};

export const updateHospitalBed = (data) => {
  return {
    type: UPDATE_HOSPITAL_BED,
    payload: data,
  };
};
