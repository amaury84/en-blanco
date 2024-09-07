// src/TableComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TableComponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.31.33.33:5000/topologias", {
          params: { query, tecnologia }, // Enviar la consulta como parámetro
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, tecnologia]); // Actualiza cuando la consulta cambia

  if (data.length == 0) {
    return <div>Sin datos</div>;
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
            <th>IpEquipoDestino</th>
            <th>IpEquipoROU</th>
            <th>Tecnologia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.IpEquipoDestino}</td>
              <td>{item.EquipoDestino}</td>
              <td>{item.TrunkDest}</td>
              <td>{item.TrkROU}</td>
              <td>{item.EquipoROU}</td>
              <td>{item.IpEquipoROU}</td>
              <td>{item.Tecnologia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
