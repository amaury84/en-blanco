// CrearComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import "./Estilos/CrearComponent.css";

function CrearComponent() {
  const [equipoDestino, setEquipoDestino] = useState("");
  const [Puertodestino, setPuertodestino] = useState("");
  const [ipdestino, setIpEquipoDestino] = useState("");
  const [ubicacionDest, setubicacionDestino] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTopologia = {
      EquipoDestino: equipoDestino,
      TrunkDest: Puertodestino,
    };

    try {
      await axios.post("http://localhost:5000/topologias", newTopologia);
      alert("Topología creada con éxito!");
    } catch (error) {
      console.error("Error al crear la topología:", error);
      alert("Error al crear la topología.");
    }
  };

  return (
    <main>
      <div>
        <Link to="/">Inicio</Link> {/* Enlace a la página principal */}
        <br />
        <h1>Crear nueva TOPOLOGÍA</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="equipoDestino">Equipo Destino:</label>
          <input
            type="text"
            id="equipoDestino"
            value={equipoDestino}
            onChange={(e) => setEquipoDestino(e.target.value)}
          />
          <label htmlFor="Puertodestino">Puerto Equipo Destino</label>
          <input
            type="text"
            id="Puertodestino"
            value={Puertodestino}
            onChange={(e) => setPuertodestino(e.target.value)}
          />
          <label htmlFor="ipdestino">IP Equipo Destino</label>
          <input
            type="text"
            id="ipdestino"
            value={ipdestino}
            onChange={(e) => setIpEquipoDestino(e.target.value)}
          />

          <label htmlFor="ubicacionDest">Ubicacion Equipo Destino</label>
          <input
            type="text"
            id="ubicacionDest"
            value={ubicacionDest}
            onChange={(e) => setubicacionDestino(e.target.value)}
          />
        </div>
        <button type="submit">Crear Topología</button>
      </form>
    </main>
  );
}

export default CrearComponent;
