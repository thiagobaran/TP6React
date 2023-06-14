import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [timer, setTimer] = useState(15);
  const [letrasAyuda, setLetrasAyuda] = useState(0);
  
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
      const random = Math.floor(Math.random() * paises.length);
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
    console.log(paisAdivinado);
    if (paisSeleccionado && paisSeleccionado.country) {
      const nombrePaisSeleccionado = paisSeleccionado.country.toLowerCase();
      if (paisAdivinado === nombrePaisSeleccionado) {
        setPuntaje(puntajeAnt => puntajeAnt + 10); 
      } else {
        setPuntaje(puntajeAnt => puntajeAnt - 1); 
      }
    }
  };

  const ayuda = () => {
    if (letrasAyuda < paisSeleccionado.paises.length - 1) {
      setLetrasAyuda((LetrasAnt) => LetrasAnt + 1);
    }
  };

  return (
    <div>
      {paisSeleccionado && (
        <div>
          <img src={paisSeleccionado.flag} alt="Country Flag"/>
          <form onSubmit={respuesta}>
            <input type="text" name="guess" placeholder="Ingresá país" />
            <button type="submit">Confirmar</button>
          </form>
          <p>Puntaje: {puntaje}</p>
          <p>Timer: {timer}s</p>
          <button onClick={ayuda}>Ayuda</button>
          <p>Ayudas utilizadas: {letrasAyuda}</p>
        </div>
      )}
    </div>
  );
}

export default App;
