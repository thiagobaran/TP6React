import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


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
    console.log(paisAdivinado);
    if (paisSeleccionado && paisSeleccionado.name) {
      const nombrePaisSeleccionado = paisSeleccionado.name.toLowerCase();
      if (paisAdivinado === nombrePaisSeleccionado) {
        setPuntaje(puntajeAnt => puntajeAnt + 10 + timer);
      } else {
        setPuntaje(puntajeAnt => puntajeAnt - 1);
      }
    }
  };
  const nuevaBandera = (timer) =>{
    const random = Math.floor(Math.random() * paises.length);
    setPaisSeleccionado(paises[random]);
    setTimer(15);
  }

  return (
    <div>
      {paisSeleccionado && (
        <div>
          <img class="imagenes" src={paisSeleccionado.flag} alt=""/>
          <form class="formulario" onSubmit={respuesta}>
            <input type="text" name="guess" placeholder="Ingresá país" />
            <button class="botones" type="submit">Confirmar</button>
          </form>
          <button class="botonSiguiente" onClick={nuevaBandera} type="submit">Siguiente</button>
          <div className="score-timer"> 
          <p>Puntaje: {puntaje}</p>
          <p>Timer: {timer}s</p>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;
