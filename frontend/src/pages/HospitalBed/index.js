import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { FiClock } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';
import { MdDeleteSweep } from 'react-icons/md';


import { deleteSensorData } from '../../actions';


import { TimeSerieLineChart, TimeAgoLabel, ReportTable, timeFormatter } from '@ese_tecnodigital/dashboard';

import './styles.css';

const HospitalBed = ({ name, records, sensorData, reportsData, deleteSensorData }) => {
  let { id } = useParams();
  const dataFormat = [
    {icon:<FiClock  size={20} />, dataName: 'timestamp', unit: '', formatter: timeFormatter},
    {icon:<FaHeartbeat size={20} />, dataName: 'beat', unit: 'bpm', formatter: null},
    {icon:<GiLungs size={20} />, dataName: 'spo2', unit: '%', formatter: null},
    {icon:<WiThermometer size={20} />, dataName: 'temp', unit: 'ºC', formatter: null}
  ]


  return (
    <div>
      <div className="sub-header-container">
        <p>{name}</p>
        <div className="time-label">
          <span>
            ID do Sensor: {id} - <TimeAgoLabel date={sensorData.timestamp} short={false} />
          </span>
          <button
            className="button"
            onClick={() => deleteSensorData(id)}
            type="button"
            title="Deletar registros do sensor"
          >
            <MdDeleteSweep size={22} color="red" />
          </button>
        </div>
      </div>
      <div className="hospital-bed-container">
        <div className="hb-monitoring-container">
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Freq. Cardíaca</h2>
              <FaHeartbeat size={64} />
              <h2>{sensorData.beat} bpm</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                data={records}
                dataKeyX="timestamp"
                dataKeyY="beat"
                syncId="anyId"
                fillColor="#2fc432"
                unit=" bpm"
                lineName="Freq. Cardíaca"
                tickStep={5}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>SpO2</h2>
              <GiLungs size={64} />
              <h2>{sensorData.spo2} %</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                data={records}
                dataKeyX="timestamp"
                dataKeyY="spo2"
                syncId="anyId"
                fillColor="#2076e0"
                unit=" %"
                lineName="SpO2"
                tickStep={5}
                fixedDomain={[(dataMin) => dataMin, 100]}
                rangeLimit={[0, 100]}
              />
            </div>
          </div>
          <div className="info-chart-container">
            <div className="card-container card-info-container">
              <h2>Temperatura</h2>
              <WiThermometer size={64} />
              <h2>{sensorData.temp} ºC</h2>
            </div>
            <div className="card-container card-chart-container">
              <TimeSerieLineChart
                data={records}
                dataKeyX="timestamp"
                dataKeyY="temp"
                syncId="anyId"
                fillColor="#e02041"
                unit=" ºC"
                lineName="Temperatura"
                tickStep={0.5}
                valueFormatter={(value) => Number(value).toFixed(1)}
              />
            </div>
          </div>
        </div>
        <div className="hb-report-container">
          <ReportTable className="hb-report-table" key={id} name={name} reports={reportsData} dataFormat={dataFormat} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  const records = state.sensors[id].data;
  const sensorData = records[records.length - 1];
  const reportsData = state.reports[id].data;
  const name = state.hospitalBeds[id].bed_number;
  return { name, records, sensorData, reportsData };
};

export default connect(mapStateToProps, { deleteSensorData })(HospitalBed);
