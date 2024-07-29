// src/App.js
import React, { useState } from 'react';
import DiagramComponent from './DiagramComponent';
import TableComponent from './TableComponent';
import './App.css';

const App = () => {
  const [consulta, setConsulta] = useState('');
  const [consultaGuardada, setConsultaGuardada] = useState('');

  const handleInputChange = (event) => {
    setConsulta(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConsultaGuardada(consulta);
  };

  return (
    <div className="App">
      <header>
        <h1>TOPOLOGÍAS DE RED CLARO</h1>
        <img src={`${process.env.PUBLIC_URL}/imagenes/claro-hogar-259.jpg`} alt="Claro Logo" />
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
          </nav>
          <select id="tecnologia" onchange="SelecTecnologia()">
          <option value=""> </option>
          <option value="CMTS">CMTS</option>
          <option value="FTTH">FTTH</option>
          <option value="FTTO">FTTO</option>          
         </select>
          <aside>
            <h2>Relacionado</h2>
            <ul>
            <li><a href="https://claromovilco.sharepoint.com/sites/PROYECTOSCERTIFICACIONUNIDADHOGARES" target="_blank" rel="noopener noreferrer">Sharepoint</a></li>
            <li><a href="https://www.google.com/?hl=es" target="_blank" rel="noopener noreferrer">Sitio 1</a></li>
            </ul>
          </aside>
        </div>
        <article className="diagrama-container">
          <DiagramComponent
            consulta={consultaGuardada}
            consultaGuardada={consultaGuardada}
            setConsultaGuardada={setConsultaGuardada} />

          {consultaGuardada && (
            <div className="consulta-guardada">
              <p>Última consulta: {consultaGuardada}</p>
            </div>
          )}
          
          <TableComponent query={consultaGuardada} /> {/* Añade el componente de la tabla y pasa la consulta */}
        </article>
      </main>
      <footer>
        <p>&copy; Todos los derechos revertidos.</p>
      </footer>
    </div>
  );
};

export default App;
