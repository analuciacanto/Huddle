import { ADD_HOSPITAL_BED, RESET_HOSPITAL_BEDS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case RESET_HOSPITAL_BEDS:
      state = {}
      if (action.payload != null) {
        action.payload.forEach(config => {
          state[config.index] = config;
        });
      }
      return state;

    case ADD_HOSPITAL_BED:
      state[action.payload.index] = action.payload;
      return { ...state };

    default:
      return state;
  }
};
