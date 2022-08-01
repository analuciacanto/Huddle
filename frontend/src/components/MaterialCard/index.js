import React from 'react';
import FrontCard from './FrontCard';
import './styles.css';

const Card = (props) => {
  const measures = props.measures;

  return (
    <div className="card-container-holder">
    <div className={'card-container'}>
      <div className="card-face front-card-container">
        <div className={props.level === 'danger' ? 'alert-bar danger' : props.level === 'warning' ? 'alert-bar warning' : 'alert-bar normal' }>          
          </div>
          <FrontCard
            name={"Sala H-304A"}
            measures={measures}
          />                  
      </div>
       </div>
  </div>
   
  );
};


export default Card;
