import React from 'react';
import FrontCard from './FrontCard';
import './styles.css';

const Card = (props) => {
  const { name, measures } = props.material;

  return (
    <div className="card-container-holder">
    <div className={'card-container'}>
      <div className="card-face front-card-container">
        <div className={'alert-bar normal'}>          
          </div>
          <FrontCard
            name={name}
            measures={measures}
          />          
        
      </div>
   
    </div>
  </div>
   
  );
};


export default Card;
