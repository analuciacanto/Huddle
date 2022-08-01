import React from 'react';
import FrontCard from './FrontCard';
import './styles.css';

const Card = (props) => {
  const { name, measures } = props.material;

  return (
    <div className="card-container-holder">
        <div className="card-face front-card-container">       
          <FrontCard
            name={name}
            measures={measures}
          />     
           </div>
    </div>
  );
};


export default Card;
