import store from '../store';
import { resetHospitalBeds, addHospitalBed } from '../actions';

const handleConfigurationMessage = (...messages) => {
    messages.forEach((message) => {
        const { type, data } = message;
        switch (type) {
            case 'reset':
                handleReset(data);
                break;
            case 'add':
                debugger;
                handleAdd(data);
                break;
            case 'remove':
                handleRemove();
                break;
        }
    });
};

const handleReset = (data) => {
    store.dispatch(resetHospitalBeds(data));
};

const handleAdd = (config) => {
    store.dispatch(addHospitalBed(config));
};

const handleRemove = (config) => {
    // store.dispatch(addHospitalBed(config));
};

export default handleConfigurationMessage;
