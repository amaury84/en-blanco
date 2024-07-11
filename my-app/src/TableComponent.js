// src/TableComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Obtener los datos del backend
    axios.get('http://localhost:5000/nodes')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
         
          <th>Key</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            
            <td>{item.key}</td>
            <td>{item.color}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
