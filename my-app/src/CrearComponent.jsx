// CrearComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilos/CrearComponent.css";

function CrearComponent() {
  const [equipoDestino, setEquipoDestino] = useState("");
  const [Puertodestino, setPuertodestino] = useState("");
  const [ipdestino, setIpEquipoDestino] = useState("");
  const [ubicacionDest, setubicacionDestino] = useState("");
  const [puertoRx1, setPuertoRx1] = useState("");
  const [equipoTx1, setEquipoTx1] = useState("");
  const [puertoTx1, setPuertoTx1] = useState("");
  const [puertoROU, setPuertoROU] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTopologia = {
      EquipoDestino: equipoDestino,
      TrunkDest: Puertodestino,
      IpDestino: ipdestino,
      UbicacionDestino: ubicacionDest,
      PuertoRx1: puertoRx1,
      EquipoTx1: equipoTx1,
      PuertoTx1: puertoTx1,
      PuertoROU: puertoROU,
    };

    try {
      const response = await axios.post("http://localhost:5000/topologia", newTopologia);
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
          <label htmlFor="puertoRx1">Puerto Rx Equipo Transmisión 1</label>
          <input
            type="text"
            id="puertoRx1"
            value={puertoRx1}
            onChange={(e) => setPuertoRx1(e.target.value)}
          />
          <label htmlFor="equipoTx1">Equipo Transmisión 1</label>
          <input
            type="text"
            id="equipoTx1"
            value={equipoTx1}
            onChange={(e) => setEquipoTx1(e.target.value)}
          />
        </div>
        <button type="submit">Crear Topología</button>
      </form>
    </main>
  );
}

export default CrearComponent;
