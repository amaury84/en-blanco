import React, { useState } from "react";
import DiagramComponent from "./DiagramComponent";
import TableComponent from "./TableComponent";
import "./App.css";
import { Viscomponent } from "./Viscomponent";

const App = () => {
  const [consulta, setConsulta] = useState("");
  const [consultaGuardada, setConsultaGuardada] = useState("");
  const [tec, setTecnologia] = useState("FTTH");

  const handleInputChange = (event) => {
    setConsulta(event.target.value);
  };

  const handleSelectChange = (event) => {
    setTecnologia(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConsultaGuardada(consulta);
  };

  return (
    <div className="App">
      <header>
        <h1>TOPOLOGÍAS DE RED CLARO</h1>
        <img
          src={`${process.env.PUBLIC_URL}/imagenes/claro-hogar-259.jpg`}
          alt="Claro Logo"
        />
      </header>
      <main className="Contenedor">
        <div className="barra-lateral">
          <nav>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="buscador"
                placeholder="Buscar"
                value={consulta}
                onChange={handleInputChange}
              />
              <button className="button-buscar" type="submit">
                Buscar
              </button>
            </form>
            <select id="tecnologia" value={tec} onChange={handleSelectChange}>
              <option value="CMTS">CMTS</option>
              <option value="FTTH">FTTH</option>
              <option value="FTTO">FTTO</option>
            </select>
          </nav>
          <aside>
            {consultaGuardada && (
              <div className="consulta-guardada">
                <p>Última consulta: {consultaGuardada}</p>
              </div>
            )}
            <h2>Relacionado</h2>
            <ul>
              <li>
                <a
                  href="https://claromovilco.sharepoint.com/sites/PROYECTOSCERTIFICACIONUNIDADHOGARES"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sharepoint
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <article className="diagrama-container">
          <DiagramComponent consulta={consultaGuardada} tecnologia={tec} />
          <Viscomponent query={consultaGuardada} tecnologia={tec} />
          <TableComponent query={consultaGuardada} tecnologia={tec} />
        </article>
      </main>
      <footer>
        <p>&copy; Todos los derechos revertidos.</p>
      </footer>
    </div>
  );
};

export default App;
