// src/TableComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = ({ query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/topologias', {
          params: { query } // Enviar la consulta como parámetro
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]); // Actualiza cuando la consulta cambia

  if(data.length == 0) {
    return (<div>Sin datos</div>)
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Equipo Destino</th>
          <th>TrunkDest</th>
          <th>_id</th>
          <th>EquipoROU</th>
        </tr>
      </thead>
      <tbody>
        {
        data.map((item) => (
          <tr key={item._id}>
            <td>{item.EquipoDestino}</td>
            <td>{item.Trunkdest}</td>
            <td>{item._id}</td>
            <td>{item.EquipoRou}</td>


          </tr>
        ))
        }
      </tbody>
    </table>
  );
};

export default TableComponent;
