import React from 'react';
import './Bandera.css';
import PropTypes from 'prop-types';

const Bandera = ({ paisSeleccionado }) => {
  return (
    <div>
      {paisSeleccionado && (
        <img className="imagenes" src={paisSeleccionado.flag} alt="" />
      )}
    </div>
  );
};

Bandera.propTypes = {
  paisSeleccionado: PropTypes.object
};

export default Bandera;
