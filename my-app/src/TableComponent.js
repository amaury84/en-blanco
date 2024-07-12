// src/TableComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = ({ query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Obtener los datos del backend con la consulta de búsqueda
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/nodes', {
          params: { query }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Key</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.key}</td>
            <td>{item.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
