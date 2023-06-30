import React from 'react';
import './Respuesta.css';
import PropTypes from 'prop-types';

const Respuesta = ({ onSubmit }) => {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <input type="text" name="guess" placeholder="Ingresá país" />
      <button className="botones" type="submit">Confirmar</button>
    </form>
  );
};

Respuesta.propTypes = {
  onSubmit: PropTypes.func
};

export default Respuesta;
