import React from 'react';
import { connect } from 'react-redux';
import {FaHeartbeat} from "react-icons/fa";
import {GiConsoleController, GiLungs} from "react-icons/gi";
import {WiThermometer} from "react-icons/wi";

import { Card } from '@ese_tecnodigital/dashboard';
import './styles.css';

const Monitor = ({ hospitalBeds, sensors, reports }) => {
  const itens = [
    {icon:<FaHeartbeat size={32} />, dataName: 'beat', unit: 'bpm', formatter: null},
    {icon:<GiLungs size={32} />, dataName: 'spo2', unit: '%', formatter: null},
    {icon:<WiThermometer size={32} />, dataName: 'temp', unit: 'ºC', formatter: null}
  ]

  console.log(hospitalBeds, sensors, reports);
  return (
    <div className="monitor-container">
      <div className="beds-container">
        {hospitalBeds.map((hospitalBed, id) => (
          
          <Card key={id} name={hospitalBed.name} records={sensors[hospitalBed.sensorId].data} sensorId={hospitalBed.sensorId} dataFormat={itens} />
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

export default connect(mapStateToProps)(Monitor);
