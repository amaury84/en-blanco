// CrearComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilos/CrearComponent.css";

function CrearComponent() {
  const [ipEquipoDestino, setIpEquipoDestino] = useState("");
  const [equipoDestino, setEquipoDestino] = useState("");
  const [ubicacionEquipoDestino, setUbicacionEquipoDestino] = useState("");
  const [trunkDest, setTrunkDest] = useState("");
  const [tecnologia, setTecnologia] = useState("");
  const [trkROU, setTrkROU] = useState("");
  const [equipoROU, setEquipoROU] = useState("");
  const [ubicacionEquipoROU, setUbicacionEquipoROU] = useState("");
  const [ipEquipoROU, setIpEquipoROU] = useState("");

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const newTopologia = {
      IpEquipoDestino: ipEquipoDestino,
      EquipoDestino: equipoDestino,
      UbicacionEquipoDestino: ubicacionEquipoDestino,
      TrunkDest: trunkDest,
      Tecnologia: tecnologia,
      TrkROU: trkROU,
      EquipoROU: equipoROU,
      UbicacionEquipoROU: ubicacionEquipoROU,
      IpEquipoROU: ipEquipoROU,
    };

    try {
      const response = await axios.post("http://localhost:5000/topologias", newTopologia);
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
          <label htmlFor="ipEquipoDestino">IP Equipo Destino:</label>
          <input
            type="text"
            id="ipEquipoDestino"
            value={ipEquipoDestino}
            onChange={(e) => setIpEquipoDestino(e.target.value)}
          />
          <label htmlFor="equipoDestino">Equipo Destino:</label>
          <input
            type="text"
            id="equipoDestino"
            value={equipoDestino}
            onChange={(e) => setEquipoDestino(e.target.value)}
          />
          <label htmlFor="ubicacionEquipoDestino">Ubicación Equipo Destino:</label>
          <input
            type="text"
            id="ubicacionEquipoDestino"
            value={ubicacionEquipoDestino}
            onChange={(e) => setUbicacionEquipoDestino(e.target.value)}
          />
          <label htmlFor="trunkDest">Trunk Dest:</label>
          <input
            type="text"
            id="trunkDest"
            value={trunkDest}
            onChange={(e) => setTrunkDest(e.target.value)}
          />
          <label htmlFor="tecnologia">Tecnología:</label>
          <input
            type="text"
            id="tecnologia"
            value={tecnologia}
            onChange={(e) => setTecnologia(e.target.value)}
          />
          <label htmlFor="trkROU">Trk ROU:</label>
          <input
            type="text"
            id="trkROU"
            value={trkROU}
            onChange={(e) => setTrkROU(e.target.value)}
          />
          <label htmlFor="equipoROU">Equipo ROU:</label>
          <input
            type="text"
            id="equipoROU"
            value={equipoROU}
            onChange={(e) => setEquipoROU(e.target.value)}
          />
          <label htmlFor="ubicacionEquipoROU">Ubicación Equipo ROU:</label>
          <input
            type="text"
            id="ubicacionEquipoROU"
            value={ubicacionEquipoROU}
            onChange={(e) => setUbicacionEquipoROU(e.target.value)}
          />
          <label htmlFor="ipEquipoROU">IP Equipo ROU:</label>
          <input
            type="text"
            id="ipEquipoROU"
            value={ipEquipoROU}
            onChange={(e) => setIpEquipoROU(e.target.value)}
          />
        </div>
        <button type="submit">Crear Topología</button>
      </form>
    </main>
  );
}

export default CrearComponent;
