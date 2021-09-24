import React from 'react';
import { Provider } from 'react-redux';
import toaster from 'toasted-notes';

import store from '../store';
import { AlertToaster } from '@ese_tecnodigital/dashboard';

const displayToaster = (sensorId, alertType, message, timestamp, title) => {
  toaster.notify(
    ({ onClose }) => (
      <Provider store={store}>
        <AlertToaster
          sensorId={sensorId}
          alertType={alertType}
          message={message}
          timestamp={timestamp}
          title={title}
          onClose={onClose}
        />
      </Provider>
    ),
    {
      position: 'bottom-right',
      duration: null,
    }
  );
};

export default displayToaster;
