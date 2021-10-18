import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaHeartbeat } from "react-icons/fa";
import { GiLungs } from "react-icons/gi";
import { WiThermometer } from "react-icons/wi";
import { deleteSensorData } from '../../actions';


import { Card } from '@ese_tecnodigital/dashboard';
import './styles.css';

const Monitor = ({ hospitalBeds, sensors, reports, deleteSensorData}) => {
  const dataFormat = [
    {icon:<FaHeartbeat size={32} />, dataName: 'beat', unit: 'bpm', formatter: null},
    {icon:<GiLungs size={32} />, dataName: 'spo2', unit: '%', formatter: null},
    {icon:<WiThermometer size={32} />, dataName: 'temp', unit: 'ºC', formatter: null}
  ]

  const history = useHistory();

  const handleCardClick = (sensorId) => {
    history.push(`/beds/${sensorId}`);
  };

  const handleDeleteSensorData = (sensorId) => {
    deleteSensorData(sensorId);
  };

  return (
    <div className="monitor-container">
      <div className="beds-container">
        {Object.entries(hospitalBeds).map(([key, hospitalBed], id) => (
          <Card key={id} 
            onCardClick={handleCardClick} 
            onDeleteClick={handleDeleteSensorData}
            name={`Leito ${hospitalBed.bed_number}`}
            records={sensors[key].data} 
            isDataExpired={sensors[key].expired} 
            sensorId={key} 
            dataFormat={dataFormat} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const hospitalBeds = state.hospitalBeds;
  const sensors = state.sensors;
  const reports = state.reports;
  return { hospitalBeds, sensors, reports };
};

export default connect(mapStateToProps, { deleteSensorData })(Monitor);
