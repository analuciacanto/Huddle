import store from '../store';
import { 
    resetHospitalBeds, 
    addHospitalBed,
    removeHospitalBed,
    updateHospitalBed
} from '../actions';

const handleConfigurationMessage = (...messages) => {
    messages.forEach((message) => {
        const { type, data } = message;
        switch (type) {
            case 'reset': {
                handleReset(data);
                break;
            }
            case 'add': {
                handleAdd(data);
                break;
            }
            case 'remove': {
                debugger;
                handleRemove(data);
                break;
            }
            case 'update': {
                handleUpdate(data);
                break;
            }
        }
    });
};

const handleReset = (data) => {
    store.dispatch(resetHospitalBeds(data));
};

const handleAdd = (config) => {
    store.dispatch(addHospitalBed(config));
};

const handleRemove = (config_id) => {
    store.dispatch(removeHospitalBed(config_id));
};

const handleUpdate = (config) => {
    store.dispatch(updateHospitalBed(config));
};

export default handleConfigurationMessage;
