import React, {useState} from 'react';
import './styles.css';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

const FrontCard = (props) => {

  const [indicators] = useState({temperature: 50, humidity: 40});

  return (
    <div className="content">  
      <h1>{props.name}</h1>    
      <div className="sensor-info">
        <DeviceThermostatOutlinedIcon  fontSize="large"/>
        <p>
          {props.measures?.temperature}/{indicators.temperature} ºC
        </p>
      </div>
      <div className="sensor-info">
        <InvertColorsIcon  fontSize="large"/>
        <p>
          {props.measures?.humidity}/{indicators.humidity} %
        </p>
      </div>    
    </div>
  );
};

export default FrontCard;
