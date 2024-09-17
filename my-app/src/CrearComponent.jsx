import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/CrearComponent.module.css";
import "./Estilos/estilosGlobales.css";

function CrearComponent() {
  const [ipEquipoDestino, setIpEquipoDestino] = useState("");
  const [equipoDestino, setEquipoDestino] = useState("");
  const [ubicacionEquipoDestino, setUbicacionEquipoDestino] = useState("");
  const [trunkDest, setTrunkDest] = useState("");
  const [tecnologia, setTecnologia] = useState(" ");
  const [trkROU, setTrkROU] = useState("");
  const [equipoROU, setEquipoROU] = useState("");
  const [ubicacionEquipoROU, setUbicacionEquipoROU] = useState("");
  const [ipEquipoROU, setIpEquipoROU] = useState("");

  // Nuevos campos opcionales
  const [trkRx1, setTrkRx1] = useState("");
  const [equipoTx1, setEquipoTx1] = useState("");
  const [trkTx1, setTrkTx1] = useState("");
  const [trkRx2, setTrkRx2] = useState("");
  const [equipoTx2, setEquipoTx2] = useState("");
  const [trkTx2, setTrkTx2] = useState("");
  const [trkRx3, setTrkRx3] = useState("");
  const [equipoTx3, setEquipoTx3] = useState("");
  const [trkTx3, setTrkTx3] = useState("");
  const [trkRx4, setTrkRx4] = useState("");
  const [equipoTx4, setEquipoTx4] = useState("");
  const [trkTx4, setTrkTx4] = useState("");
  const [trkRx5, setTrkRx5] = useState("");
  const [equipoTx5, setEquipoTx5] = useState("");
  const [trkTx5, setTrkTx5] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tecnologia.trim() === "") {
      alert("Por favor llene el campo Obligatorio Tecnología");
      return; // No continúa con la creación de la topología
    }
  
    // Solo agregar campos que no estén vacíos
    const newTopologia = {};
    
    // Función para agregar campos no vacíos
    const addIfNotEmpty = (fieldName, value) => {
      if (value.trim() !== "") {
        newTopologia[fieldName] = value;
      }
    };
  
    // Campos obligatorios
    addIfNotEmpty("IpEquipoDestino", ipEquipoDestino);
    addIfNotEmpty("EquipoDestino", equipoDestino);
    addIfNotEmpty("UbicacionEquipoDestino", ubicacionEquipoDestino);
    addIfNotEmpty("TrunkDest", trunkDest);
    newTopologia.Tecnologia = tecnologia; // Tecnología es obligatorio
    addIfNotEmpty("TrkROU", trkROU);
    addIfNotEmpty("EquipoROU", equipoROU);
    addIfNotEmpty("UbicacionEquipoROU", ubicacionEquipoROU);
    addIfNotEmpty("IpEquipoROU", ipEquipoROU);
  
    // Nuevos campos opcionales
    addIfNotEmpty("TrkRx1", trkRx1);
    addIfNotEmpty("EquipoTx1", equipoTx1);
    addIfNotEmpty("TrkTx1", trkTx1);
    addIfNotEmpty("TrkRx2", trkRx2);
    addIfNotEmpty("EquipoTx2", equipoTx2);
    addIfNotEmpty("TrkTx2", trkTx2);
    addIfNotEmpty("TrkRx3", trkRx3);
    addIfNotEmpty("EquipoTx3", equipoTx3);
    addIfNotEmpty("TrkTx3", trkTx3);
    addIfNotEmpty("TrkRx4", trkRx4);
    addIfNotEmpty("EquipoTx4", equipoTx4);
    addIfNotEmpty("TrkTx4", trkTx4);
    addIfNotEmpty("TrkRx5", trkRx5);
    addIfNotEmpty("EquipoTx5", equipoTx5);
    addIfNotEmpty("TrkTx5", trkTx5);
  
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
      <h1>Registrar nueva TOPOLOGÍA</h1>
      <p className={styles.porFavorText}>
        Por favor llene todos los campos marcados con "*" ya que son
        obligatorios.
      </p>
      <div>
        <form className={styles.crearFormulario} onSubmit={handleSubmit}>
          {/* Campos existentes */}
          <div>
            <label htmlFor="ipEquipoDestino">IP OLT/CMTS</label>
            <input
              type="text"
              id="ipEquipoDestino"
              value={ipEquipoDestino}
              onChange={(e) => setIpEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoDestino">OLT/CMTS(*)</label>
            <input
              type="text"
              id="equipoDestino"
              value={equipoDestino}
              onChange={(e) => setEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoDestino">UBICACIÓN OLT/CMTS</label>
            <input
              type="text"
              id="ubicacionEquipoDestino"
              value={ubicacionEquipoDestino}
              onChange={(e) => setUbicacionEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trunkDest">PUERTO OLT/CMTS(*)</label>
            <input
              type="text"
              id="trunkDest"
              value={trunkDest}
              onChange={(e) => setTrunkDest(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkROU">PUERTO DESTINO(*)</label>
            <input
              type="text"
              id="trkROU"
              value={trkROU}
              onChange={(e) => setTrkROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoROU">EQUIPO DESTINO(*)</label>
            <input
              type="text"
              id="equipoROU"
              value={equipoROU}
              onChange={(e) => setEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoROU">UBICACIÓN EQUIPO DESTINO</label>
            <input
              type="text"
              id="ubicacionEquipoROU"
              value={ubicacionEquipoROU}
              onChange={(e) => setUbicacionEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ipEquipoROU">IP EQUIPO DESTINO</label>
            <input
              type="text"
              id="ipEquipoROU"
              value={ipEquipoROU}
              onChange={(e) => setIpEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tecnologia">TECNOLOGÍA(*)</label>
            <select
              className={styles.tecCrear}
              id="tecnologia"
              value={tecnologia}
              onChange={(e) => setTecnologia(e.target.value)}
            >
              <option value=" "> </option>
              <option value="CMTS">CMTS</option>
              <option value="FTTH">FTTH</option>
              <option value="FTTO">FTTO</option>
            </select>
          </div>
          {/* Nuevos campos opcionales */}
          <div>
            <label htmlFor="trkRx1">IN EQUIPO TX1</label>
            <input
              type="text"
              id="trkRx1"
              value={trkRx1}
              onChange={(e) => setTrkRx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx1">EQUIPO TX1</label>
            <input
              type="text"
              id="equipoTx1"
              value={equipoTx1}
              onChange={(e) => setEquipoTx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx1">OUT EQUIPO TX1</label>
            <input
              type="text"
              id="trkTx1"
              value={trkTx1}
              onChange={(e) => setTrkTx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx2">IN EQUIPO TX2</label>
            <input
              type="text"
              id="trkRx2"
              value={trkRx2}
              onChange={(e) => setTrkRx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx2">EQUIPO TX2</label>
            <input
              type="text"
              id="equipoTx2"
              value={equipoTx2}
              onChange={(e) => setEquipoTx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx2">OUT EQUIPO TX2</label>
            <input
              type="text"
              id="trkTx2"
              value={trkTx2}
              onChange={(e) => setTrkTx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx3">IN EQUIPO TX3</label>
            <input
              type="text"
              id="trkRx3"
              value={trkRx3}
              onChange={(e) => setTrkRx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx3">EQUIPO TX3</label>
            <input
              type="text"
              id="equipoTx3"
              value={equipoTx3}
              onChange={(e) => setEquipoTx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx3">OUT EQUIPO TX3</label>
            <input
              type="text"
              id="trkTx3"
              value={trkTx3}
              onChange={(e) => setTrkTx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx4">IN EQUIPO TX4</label>
            <input
              type="text"
              id="trkRx4"
              value={trkRx4}
              onChange={(e) => setTrkRx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx4">EQUIPO TX4</label>
            <input
              type="text"
              id="equipoTx4"
              value={equipoTx4}
              onChange={(e) => setEquipoTx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx4">OUT EQUIPO TX4</label>
            <input
              type="text"
              id="trkTx4"
              value={trkTx4}
              onChange={(e) => setTrkTx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx5">IN EQUIPO TX5</label>
            <input
              type="text"
              id="trkRx5"
              value={trkRx5}
              onChange={(e) => setTrkRx5(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx5">EQUIPO TX5</label>
            <input
              type="text"
              id="equipoTx5"
              value={equipoTx5}
              onChange={(e) => setEquipoTx5(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx5">OUT EQUIPO TX5</label>
            <input
              type="text"
              id="trkTx5"
              value={trkTx5}
              onChange={(e) => setTrkTx5(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=" "> </label>
          </div>
  
          <button className={styles.botonCrear} type="submit">
            Crear Topología
          </button>
        </form>
      </div>
    </main>
  );
}

export default CrearComponent;
