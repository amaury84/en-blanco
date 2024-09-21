import React, { useState } from "react";
import axios from "axios";
import styles from "./Estilos/EditComponent.module.css";

const EditComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTechnology, setSearchTechnology] = useState("");
  const [editingData, setEditingData] = useState([]);
  const [topologiaCreada, setTopologiaCreada] = useState(false); // Nuevo estado para el mensaje

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://172.31.33.33:5000/topologias", {
        params: { query: searchQuery, tecnologia: searchTechnology },
      });
      console.log("Datos obtenidos:", response.data);
      setEditingData(response.data); // Aquí se guarda el array completo de resultados
    } catch (error) {
      console.error("Error al buscar los datos:", error);
    }
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://172.31.33.33:5000/topologias/${id}`,
        updatedData
      );
      console.log("Datos actualizados correctamente:", response.data);
      setTopologiaCreada(true); // Se establece en true al guardar correctamente
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setTopologiaCreada(false); // En caso de error, se asegura de no mostrar el mensaje de éxito
    }
  };

  return (
    <main>
      <div className={styles.contenedorEncabezadoEditar}>
        <h1>EDICIÓN DE TOPOLOGÍA</h1>
        <p className={styles.ingreseOlt}>
          Ingrese el nombre del Equipo a buscar
        </p>
        <input
          className={styles.inputBusquedaEditar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Equipo"
        />

        <select
          id="tecnologia"
          className={styles.selectBusquedaEditar}
          value={searchTechnology}
          onChange={(e) => setSearchTechnology(e.target.value)}
        >
          <option value="CMTS">CMTS</option>
          <option value="FTTH">FTTH</option>
          <option value="FTTO">FTTO</option>
        </select>
        <button className={styles.botonBuscarEditar} onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Mensaje de éxito */}
      {topologiaCreada && (
        <div className={styles.cuadroExito}>
          La topología se creó exitosamente.
        </div>
      )}

      {/* Renderiza un formulario por cada resultado */}
      {editingData.map((item) => (
        <div key={item._id} className={styles.formContainer}>
          <form className={styles.formularioEditar}>
            <label>IP OLT/CMTS:</label>
            <input
              type="text"
              value={item.IpEquipoDestino || ""}
              onChange={(e) => {
                const updated = { ...item, IpEquipoDestino: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OLT/CMTS(*)</label>
            <input
              type="text"
              value={item.EquipoDestino || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoDestino: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>UBICACIÓN OLT/CMTS</label>
            <input
              type="text"
              value={item.UbicacionEquipoDestino || ""}
              onChange={(e) => {
                const updated = {
                  ...item,
                  UbicacionEquipoDestino: e.target.value,
                };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>PUERTO OLT/CMTS(*)</label>
            <input
              type="text"
              value={item.TrunkDest || ""}
              onChange={(e) => {
                const updated = { ...item, TrunkDest: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>TECNOLOGÍA(*)</label>
            <select
              value={item.Tecnologia || ""}
              onChange={(e) => {
                const updated = { ...item, Tecnologia: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            >
              <option value="FTTO">FTTO</option>
              <option value="FTTH">FTTH</option>
              <option value="CMTS">CMTS</option>
            </select>

            <label>IN EQUIPO TX1</label>
            <input
              type="text"
              value={item.TrkRx1 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX1</label>
            <input
              type="text"
              value={item.EquipoTx1 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX1</label>
            <input
              type="text"
              value={item.TrkTx1 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx1: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX2</label>
            <input
              type="text"
              value={item.TrkRx2 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX2</label>
            <input
              type="text"
              value={item.EquipoTx2 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX2</label>
            <input
              type="text"
              value={item.TrkTx2 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx2: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX3</label>
            <input
              type="text"
              value={item.TrkRx3 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX3</label>
            <input
              type="text"
              value={item.EquipoTx3 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX3</label>
            <input
              type="text"
              value={item.TrkTx3 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx3: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX4</label>
            <input
              type="text"
              value={item.TrkRx4 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX4</label>
            <input
              type="text"
              value={item.EquipoTx4 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX4</label>
            <input
              type="text"
              value={item.TrkTx4 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx4: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IN EQUIPO TX5</label>
            <input
              type="text"
              value={item.TrkRx5 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkRx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO TX5</label>
            <input
              type="text"
              value={item.EquipoTx5 || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoTx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>OUT EQUIPO TX5</label>
            <input
              type="text"
              value={item.TrkTx5 || ""}
              onChange={(e) => {
                const updated = { ...item, TrkTx5: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>PUERTO DESTINO(*)</label>
            <input
              type="text"
              value={item.TrkROU || ""}
              onChange={(e) => {
                const updated = { ...item, TrkROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>EQUIPO DESTINO(*)</label>
            <input
              type="text"
              value={item.EquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, EquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>UBICACIÓN EQUIPO DESTINO</label>
            <input
              type="text"
              value={item.UbicacionEquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, UbicacionEquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <label>IP EQUIPO DESTINO</label>
            <input
              type="text"
              value={item.IpEquipoROU || ""}
              onChange={(e) => {
                const updated = { ...item, IpEquipoROU: e.target.value };
                setEditingData((prevData) =>
                  prevData.map((data) =>
                    data._id === item._id ? updated : data
                  )
                );
              }}
            />

            <button
              type="button"
              onClick={() =>
                handleSave(item._id, {
                  IpEquipoDestino: item.IpEquipoDestino,
                  EquipoDestino: item.EquipoDestino,
                  UbicacionEquipoDestino: item.UbicacionEquipoDestino,
                  TrunkDest: item.TrunkDest,
                  Tecnologia: item.Tecnologia,
                  TrkRx1: item.TrkRx1,
                  EquipoTx1: item.EquipoTx1,
                  TrkTx1: item.TrkTx1,
                  TrkRx2: item.TrkRx2,
                  EquipoTx2: item.EquipoTx2,
                  TrkTx2: item.TrkTx2,
                  TrkRx3: item.TrkRx3,
                  EquipoTx3: item.EquipoTx3,
                  TrkTx3: item.TrkTx3,
                  TrkRx4: item.TrkRx4,
                  EquipoTx4: item.EquipoTx4,
                  TrkTx4: item.TrkTx4,
                  TrkRx5: item.TrkRx5,
                  EquipoTx5: item.EquipoTx5,
                  TrkTx5: item.TrkTx5,
                  TrkROU: item.TrkROU,
                  EquipoROU: item.EquipoROU,
                  UbicacionEquipoROU: item.UbicacionEquipoROU,
                  IpEquipoROU: item.IpEquipoROU,
                })
              }
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
