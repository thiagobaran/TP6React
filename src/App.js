import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [timer, setTimer] = useState(15);
  const [jugador, setJugador] = useState("");
  const [letrasAyuda, setLetrasAyuda] = useState(0);
  
  

  useEffect(() => {
    
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((response) => {
        setPaises(response.data);
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
      setPuntaje((puntajeAnt) => puntajeAnt + timer);
    }

    return () => {
      clearInterval(regresiva);
    };
  }, [timer]);

  const handleGuess = (event) => {
    event.preventDefault();
    const paisAdivinado = event.target.elements.guess.value;
    if (paisAdivinado.toLowerCase() === paisSeleccionado.paises.toLowerCase()) {
      setPuntaje((puntajeAnt) => puntajeAnt + 10);
      event.target.reset();
    } else {
      setPuntaje((puntajeAnt) => puntajeAnt - 1);
    }
  };

  const handleHelp = () => {
    if (letrasAyuda < paisSeleccionado.paises.length - 1) {
      setLetrasAyuda((LetrasAnt) => LetrasAnt + 1);
    }
  };

  return (
    <div>
      <h1>Flag Guessing Game</h1>
      {paisSeleccionado && (
        <div>
          <img src={paisSeleccionado.flag} alt="Country Flag" />
          <form onSubmit={handleGuess}>
            <input type="text" name="guess" placeholder="Enter country name" />
            <button type="submit">Guess</button>
          </form>
          <p>Score: {puntaje}</p>
          <p>Timer: {timer}s</p>
          <button onClick={handleHelp}>Help</button>
          <p>Help Letters: {letrasAyuda}</p>
        </div>
      )}
    </div>
  );
}

export default App;
