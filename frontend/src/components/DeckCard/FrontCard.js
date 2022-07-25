import React from 'react';
import './styles.css';

const FrontCard = (props) => {


  return (
    <div className="content">  
      <h1>{props.name}</h1>    
      <div className="sensor-info-equipment ">
        <p>
          {props.equipment}
        </p>
      </div>
      <div className="sensor-info-status ">
        <p>
          {props.status}
        </p>
      </div>    
    </div>
  );
};

export default FrontCard;
