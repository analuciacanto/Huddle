import React from 'react';
import { connect } from 'react-redux';

import { FiClock } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { WiThermometer } from 'react-icons/wi';
import { ReportTable, timeFormatter } from '@ese_tecnodigital/dashboard';

const Reports = ({ reports, hospitalBeds }) => {
  const dataFormat = [
    {icon:<FiClock  size={20} />, dataName: 'timestamp', unit: '', formatter: timeFormatter},
    {icon:<FaHeartbeat size={20} />, dataName: 'beat', unit: 'bpm', formatter: null},
    {icon:<GiLungs size={20} />, dataName: 'spo2', unit: '%', formatter: null},
    {icon:<WiThermometer size={20} />, dataName: 'temp', unit: 'ºC', formatter: null}
  ]

  return (
    <div className="monitor-container">
      <div className="beds-container">
        {Object.entries(hospitalBeds).map(([key, hospitalBed], id) => (
          <ReportTable key={id} 
                        dataFormat={dataFormat}
                        name={`Leito ${hospitalBed.bed_number}`}
                        reports={reports[key].data} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const reports = state.reports;
  const hospitalBeds = state.hospitalBeds;
  return { reports, hospitalBeds };
};

export default connect(mapStateToProps)(Reports);
