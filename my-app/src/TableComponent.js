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

  if (data.length == 0) {
    return (<div>Sin datos</div>)
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Equipo Destino</th>
            <th>TrunkDest</th>
            <th>TrkROU</th>
            <th>EquipoROU</th>
            <th>TrkRx1</th>
            <th>EquipoTx1</th>
            <th>TrkTx1</th>
            <th>TrkRx2</th>
            <th>EquipoTx2</th>
            <th>TrkTx2</th>
            <th>TrkRx3</th>
            <th>EquipoTx3</th>
            <th>TrkTx3</th>
            <th>TrkRx4</th>
            <th>EquipoTx4</th>
            <th>TrkTx4</th>
            <th>TrkRx5</th>
            <th>EquipoTx5</th>
            <th>TrkTx5</th>
            <th>Tecnologia</th>
            <th>UbicacionDest</th>
            <th>UbicacionRou</th>
            <th>IP</th>

          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.EquipoDestino}</td>
                <td>{item.TrunkDest}</td>
                <td>{item.TrkROU}</td>
                <td>{item.EquipoROU}</td>
                <td>{item.TrkRx1}</td>
                <td>{item.EquipoTx1}</td>
                <td>{item.TrkTx1}</td>
                <td>{item.TrkRx2}</td>
                <td>{item.EquipoTx2}</td>
                <td>{item.TrkTx2}</td>
                <td>{item.TrkRx3}</td>
                <td>{item.EquipoTx3}</td>
                <td>{item.TrkTx3}</td>
                <td>{item.TrkRx4}</td>
                <td>{item.EquipoTx4}</td>
                <td>{item.TrkTx4}</td>
                <td>{item.TrkRx5}</td>
                <td>{item.EquipoTx5}</td>
                <td>{item.TrkTx5}</td>
                <td>{item.Tecnologia}</td>
                <td>{item.UbicacionDest}</td>
                <td>{item.UbicacionRou}</td>
                <td>{item.IP}</td>


              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
