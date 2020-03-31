import React from 'react';
import './InformationPlayer.css';

const InformationPlayer = ({stroke, name, score}) => (
    <div className="stats">
          <div className="number-played">
            Nombre de coup: {stroke}
          </div>
          <div className="current-player">
            Joueur: {name}
          </div>
          <div className="currently-score">
            Score: {score}
          </div>
        </div>
);

export default InformationPlayer;