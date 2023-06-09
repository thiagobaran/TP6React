import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import Respuesta from '../Respuesta/Respuesta.js';
import Bandera from '../Bandera/Bandera.js';
import Scoretimer from '../Scoretimer/Scoretimer.js';
import PropTypes from 'prop-types';

function App() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [timer, setTimer] = useState(15);
  const random = Math.floor(Math.random() * paises.length);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((response) => {
        setPaises(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (paises.length > 0) {
      setPaisSeleccionado(paises[random]);
      setTimer(15);
    }
  }, [paises]);

  useEffect(() => {
    const regresiva = setInterval(() => {
      setTimer((timerAnt) => timerAnt - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(regresiva);
      setTimer((puntajeAnt) => puntajeAnt + timer);
    }

    return () => {
      clearInterval(regresiva);
    };
  }, [timer]);

  const respuesta = (event) => {
    event.preventDefault();
    const paisAdivinado = event.target.elements.guess.value.trim().toLowerCase();
    if (paisSeleccionado && paisSeleccionado.name) {
      const nombrePaisSeleccionado = paisSeleccionado.name.toLowerCase();
      if (paisAdivinado === nombrePaisSeleccionado) {
        setPuntaje(puntajeAnt => puntajeAnt + 10 + timer);
        const random = Math.floor(Math.random() * paises.length);
        setPaisSeleccionado(paises[random]);
        setTimer(15);
      } else {
        setPuntaje(puntajeAnt => puntajeAnt - 1);
      }
    }
    event.target.elements.guess.value='';
  };

  const nuevaBandera = (timer) => {
    const random = Math.floor(Math.random() * paises.length);
    setPaisSeleccionado(paises[random]);
    setTimer(15);
  }

  return (
    <div>
      {paisSeleccionado && (
        <div>
          <Bandera paisSeleccionado={paisSeleccionado} />
          <Respuesta onSubmit={respuesta} />
          <button className="botonSiguiente" onClick={nuevaBandera} type="submit">Siguiente</button>
          <Scoretimer puntaje={puntaje} timer={timer} />
        </div>
      )}
    </div>
  );
}

App.propTypes = {
  paises: PropTypes.array,
  paisSeleccionado: PropTypes.object,
  puntaje: PropTypes.number,
  timer: PropTypes.number
};

export default App;
