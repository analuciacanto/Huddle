import RecordsQueue from '../helpers/RecordsQueue';
import emptySensorData from '../helpers/emptySensorData';
import { 
  SENSOR_DATA_RECEIVED, 
  SENSOR_DATA_CHECK, 
  DELETE_SENSOR_DATA, 
  RESET_HOSPITAL_BEDS,
  ADD_HOSPITAL_BED, 
  REMOVE_HOSPITAL_BED
} from '../actions/types';
import { RECORDS_TO_SAVE } from 'settings';

const sensorKeyPrefix = 'sensor-';

const loadInitialData = (ids) => {
  const state = {};
  ids.forEach((sensorId) => {
    const recordsQueue = new RecordsQueue(RECORDS_TO_SAVE, sensorKeyPrefix + sensorId);
    recordsQueue.loadLocal();
    if (recordsQueue.isEmpty()) {
      recordsQueue.add(emptySensorData);
    }
    state[sensorId] = {
      data: recordsQueue.queue,
      expired: 0,
    };
  });
  return state;
};

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SENSOR_DATA_RECEIVED: {
      const { sensorId, sensorData } = action.payload;
      if (!(sensorId in state))
      {
        return state;
      }

      const recordsQueue = new RecordsQueue(RECORDS_TO_SAVE, sensorKeyPrefix + sensorId);
      recordsQueue.loadLocal();
      recordsQueue.add(sensorData);
      recordsQueue.saveLocal();
      state[sensorId].data = recordsQueue.queue;
      state[sensorId].expired = 0;
      return { ...state };
    }

    case SENSOR_DATA_CHECK: {
      const expireAfterTime = action.payload;
      let hasExpired = 0;
      Object.keys(state).forEach((sensorId) => {
        const now = Date.now();
        const records = state[sensorId].data;
        const lastRecordTimestamp = records[records.length - 1].timestamp;
        if (now - lastRecordTimestamp >= expireAfterTime) {
          hasExpired = 1;
          state[sensorId].expired = 1;
        }
      });
      return hasExpired ? { ...state } : state;
    }

    case DELETE_SENSOR_DATA: {
      const sensorId = action.payload;
      localStorage.removeItem(sensorKeyPrefix + sensorId);
      const emptyData = loadInitialData([action.payload]);
      return { ...state, ...emptyData };
    }

    case RESET_HOSPITAL_BEDS: {
      return loadInitialData(action.payload.map((hospitalBed) => hospitalBed.index));
    }

    case ADD_HOSPITAL_BED: {
      const emptyData = loadInitialData([action.payload.index]);
      return { ...state, ...emptyData };
    }
    
    case REMOVE_HOSPITAL_BED: {
      delete state[action.payload];
      return { ...state };
    }

    default:
      return state;
  }
};
