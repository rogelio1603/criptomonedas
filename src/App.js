import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from  './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion.jsx';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultadoFinal, guardarResultadoFinal] = useState({});

  //State del spinner
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //Evitamos la ejecución de la primera vez
      if(moneda === '') return null;
    
      //Consultar la API para la obtención de la cotización.
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //Mostrar el Spinner
      guardarCargando(true);

      //Ocultar el spinner con un setTimeout y mostrar el resultado
      setTimeout(() => {
        //Cambiar el estado de cargando
        guardarCargando(false);
        
        //Guardar cotización+
        guardarResultadoFinal(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000)
    }
    cotizarCriptomoneda();
  },[moneda, criptomoneda])

  //Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultadoFinal={resultadoFinal} />

  return (
   <Contenedor>
     <div>
       <Imagen 
        src={imagen}
        alt="Imagen cripto"
       />
     </div>
     <div>
      <Heading>Cotiza criptomonedas al instante</Heading>
      <Formulario 
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
      />
      {componente}
     </div>
   </Contenedor>
  );
}

export default App;
