import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/EditComponent.module.css";

const EditComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTechnology, setSearchTechnology] = useState("");
  const [editingData, setEditingData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/topologias', {
        params: { query: searchQuery, tecnologia: searchTechnology }
      });
      setEditingData(response.data);  // Aquí se guarda el array completo de resultados
    } catch (error) {
      console.error('Error al buscar los datos:', error);
    }
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/topologias/${id}`, updatedData);
      console.log('Datos actualizados correctamente:', response.data);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <main>
      <div className={styles.contenedorEncabezadoEditar}>
        <h1>EDICIÓN DE TOPOLOGÍA</h1>
        <p className={styles.ingreseOlt}>Ingrese el nombre del Equipo a buscar</p>
        <input
          className={styles.inputBusquedaEditar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="EquipoDestino"
        />
        <input
          className={styles.inputBusquedaEditar}
          value={searchTechnology}
          onChange={(e) => setSearchTechnology(e.target.value)}
          placeholder="Tecnologia"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Renderiza un formulario por cada resultado */}
      {editingData.map((item) => (
        <div key={item._id} className={styles.formContainer}>
          <form>
            <label>EquipoDestino:</label>
            <input
              type="text"
              value={item.EquipoDestino}
              onChange={(e) => {
                const updated = { ...item, EquipoDestino: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) => (data._id === item._id ? updated : data))
                );
              }}
            />

            <label>Tecnología:</label>
            <input
              type="text"
              value={item.Tecnologia}
              onChange={(e) => {
                const updated = { ...item, Tecnologia: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) => (data._id === item._id ? updated : data))
                );
              }}
            />

            <button
              type="button"
              onClick={() => handleSave(item._id, { EquipoDestino: item.EquipoDestino, Tecnologia: item.Tecnologia })}
            >
              Guardar
            </button>
          </form>
        </div>
      ))}
    </main>
  );
};

export default EditComponent;
