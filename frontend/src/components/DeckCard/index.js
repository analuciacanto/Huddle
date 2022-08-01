import React from 'react';
import FrontCard from './FrontCard';
import './styles.css';

const Card = (props) => {
  const { name, equipment, status } = props.deck;

  return (
    <div className="card-container-holder">
    <div className={'card-container'}>
      <div className="card-face front-card-container">
      <div className={props.level === 'danger' ? 'alert-bar danger' : props.level === 'warning' ? 'alert-bar warning' : 'alert-bar normal' }>          
          </div>
          <FrontCard
            name={name}
            equipment={equipment}
            status={status}
          />                 
      </div>   
    </div>
  </div>
   
  );
};


export default Card;
