import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
  color: #FFF;
  font-family: Arial, Helvetica, sans-serif;
`;

const Parrafo = styled.p`
  font-size: 18px;
  span{
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span{
    font-weight: bold;
  }
`;

const Cotizacion = ({resultadoFinal}) => {
  if(Object.keys(resultadoFinal).length === 0) return null;
  return (  
    <ResultadoDiv>
      <Precio>El precio es: <span>{resultadoFinal.PRICE}</span></Precio>
      <Parrafo>El precio más alto del día: <span>{resultadoFinal.HIGHDAY}</span></Parrafo>
      <Parrafo>El precio más bajo del día: <span>{resultadoFinal.LOWDAY}</span></Parrafo>
      <Parrafo>Variación últimas 24 horas: <span>{resultadoFinal.CHANGEPCT24HOUR}</span></Parrafo>
      <Parrafo>Última actualización: <span>{resultadoFinal.LASTUPDATE}</span></Parrafo>
    </ResultadoDiv>
  );
}
 
export default Cotizacion;