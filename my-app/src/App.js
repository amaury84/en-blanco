import React, { useState } from 'react';
import DiagramComponent from './DiagramComponent';
import './App.css';

const App = () => {
  const [consulta, setConsulta] = useState('');
  const [consultaGuardada, setConsultaGuardada] = useState('');

  const handleInputChange = (event) => {
    setConsulta(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Guardar la consulta
    setConsultaGuardada(consulta);
  };

  return (
    <div className="App">
      <header>
        <h1>Topologias de red Claro</h1>
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
          <aside>
            <h2>Relacionado</h2>
            <ul>
              <li><a href="#">inf 1</a></li>
              <li><a href="#">inf 1</a></li>
            </ul>
          </aside>
        </div>
        <article className="diagrama-container">
          <DiagramComponent consulta={consulta} consultaGuardada={consultaGuardada} setConsultaGuardada={setConsultaGuardada} />
          {consultaGuardada && (
            <div className="consulta-guardada">
              <p>Última consulta: {consultaGuardada}</p>
            </div>
          )}
        </article>
      </main>
      <footer>
        <p>&copy; Todos los derechos revertidos.</p>
      </footer>
    </div>
  );
};

export default App;
