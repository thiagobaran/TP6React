import React from 'react';
import './Scoretimer.css';
import PropTypes from 'prop-types';

const Scoretimer = ({ puntaje, timer }) => {
  return (
    <div className="score-timer">
      <p>Puntaje: {puntaje}</p>
      <p>Timer: {timer}s</p>
    </div>
  );
};

Scoretimer.propTypes = {
  puntaje: PropTypes.number,
  timer: PropTypes.number
};

export default Scoretimer;
