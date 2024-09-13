import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/CrearComponent.module.css";
import "./Estilos/estilosGlobales.css";

function CrearComponent() {
  const [ipEquipoDestino, setIpEquipoDestino] = useState("");
  const [equipoDestino, setEquipoDestino] = useState("");
  const [ubicacionEquipoDestino, setUbicacionEquipoDestino] = useState("");
  const [trunkDest, setTrunkDest] = useState("");
  const [tecnologia, setTecnologia] = useState("FTTH");
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
      TrkRx1: trkRx1,
      EquipoTx1: equipoTx1,
      TrkTx1: trkTx1,
      TrkRx2: trkRx2,
      EquipoTx2: equipoTx2,
      TrkTx2: trkTx2,
      TrkRx3: trkRx3,
      EquipoTx3: equipoTx3,
      TrkTx3: trkTx3,
      TrkRx4: trkRx4,
      EquipoTx4: equipoTx4,
      TrkTx4: trkTx4,
      TrkRx5: trkRx5,
      EquipoTx5: equipoTx5,
      TrkTx5: trkTx5,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/topologias",
        newTopologia
      );
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
            <label htmlFor="ipEquipoDestino">IP Equipo Destino</label>
            <input
              type="text"
              id="ipEquipoDestino"
              value={ipEquipoDestino}
              onChange={(e) => setIpEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoDestino">Equipo Destino(*)</label>
            <input
              type="text"
              id="equipoDestino"
              value={equipoDestino}
              onChange={(e) => setEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoDestino">
              Ubicación Equipo Destino
            </label>
            <input
              type="text"
              id="ubicacionEquipoDestino"
              value={ubicacionEquipoDestino}
              onChange={(e) => setUbicacionEquipoDestino(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trunkDest">Trunk Dest(*)</label>
            <input
              type="text"
              id="trunkDest"
              value={trunkDest}
              onChange={(e) => setTrunkDest(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkROU">Trk ROU(*)</label>
            <input
              type="text"
              id="trkROU"
              value={trkROU}
              onChange={(e) => setTrkROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoROU">Equipo ROU(*)</label>
            <input
              type="text"
              id="equipoROU"
              value={equipoROU}
              onChange={(e) => setEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ubicacionEquipoROU">Ubicación Equipo ROU</label>
            <input
              type="text"
              id="ubicacionEquipoROU"
              value={ubicacionEquipoROU}
              onChange={(e) => setUbicacionEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ipEquipoROU">IP Equipo ROU</label>
            <input
              type="text"
              id="ipEquipoROU"
              value={ipEquipoROU}
              onChange={(e) => setIpEquipoROU(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tecnologia">Tecnología(*)</label>
            <select
              className={styles.tecCrear}
              id="tecnologia"
              value={tecnologia}
              onChange={(e) => setTecnologia(e.target.value)}
            >
              <option value="CMTS">CMTS</option>
              <option value="FTTH">FTTH</option>
              <option value="FTTO">FTTO</option>
            </select>
          </div>
          {/* Nuevos campos opcionales */}
          <div>
            <label htmlFor="trkRx1">Trk Rx1</label>
            <input
              type="text"
              id="trkRx1"
              value={trkRx1}
              onChange={(e) => setTrkRx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx1">Equipo Tx1</label>
            <input
              type="text"
              id="equipoTx1"
              value={equipoTx1}
              onChange={(e) => setEquipoTx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx1">Trk Tx1</label>
            <input
              type="text"
              id="trkTx1"
              value={trkTx1}
              onChange={(e) => setTrkTx1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx2">Trk Rx2</label>
            <input
              type="text"
              id="trkRx2"
              value={trkRx2}
              onChange={(e) => setTrkRx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx2">Equipo Tx2</label>
            <input
              type="text"
              id="equipoTx2"
              value={equipoTx2}
              onChange={(e) => setEquipoTx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx2">Trk Tx2</label>
            <input
              type="text"
              id="trkTx2"
              value={trkTx2}
              onChange={(e) => setTrkTx2(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx3">Trk Rx3</label>
            <input
              type="text"
              id="trkRx3"
              value={trkRx3}
              onChange={(e) => setTrkRx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx3">Equipo Tx3</label>
            <input
              type="text"
              id="equipoTx3"
              value={equipoTx3}
              onChange={(e) => setEquipoTx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx3">Trk Tx3</label>
            <input
              type="text"
              id="trkTx3"
              value={trkTx3}
              onChange={(e) => setTrkTx3(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx4">Trk Rx4</label>
            <input
              type="text"
              id="trkRx4"
              value={trkRx4}
              onChange={(e) => setTrkRx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx4">Equipo Tx4</label>
            <input
              type="text"
              id="equipoTx4"
              value={equipoTx4}
              onChange={(e) => setEquipoTx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx4">Trk Tx4</label>
            <input
              type="text"
              id="trkTx4"
              value={trkTx4}
              onChange={(e) => setTrkTx4(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkRx5">Trk Rx5</label>
            <input
              type="text"
              id="trkRx5"
              value={trkRx5}
              onChange={(e) => setTrkRx5(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equipoTx5">Equipo Tx5</label>
            <input
              type="text"
              id="equipoTx5"
              value={equipoTx5}
              onChange={(e) => setEquipoTx5(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="trkTx5">Trk Tx5</label>
            <input
              type="text"
              id="trkTx5"
              value={trkTx5}
              onChange={(e) => setTrkTx5(e.target.value)}
            />
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
