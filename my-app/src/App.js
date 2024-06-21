import React from 'react';
import DiagramComponent from './DiagramComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Topologias de red Claro</h1>
      </header>
      <main className="Contenedor">
        <div className="barra-lateral">
          <nav>
            <form>
              <input type="text" id="buscador" placeholder="Buscar" />
              <button className="button-buscar" type="submit">Buscar</button>
            </form>
          </nav>
          <aside>
            <h2>Relacionado</h2>
            <ul>
              <li><a href="#">inf 1</a></li>
              <li><a href="#">inf 1</a></li>
              <li><a href="#">inf 1</a></li>
              <li><a href="#">inf 1</a></li>
              <li><a href="#">inf 1</a></li>
            </ul>
          </aside>
        </div>
        <article className="diagrama-container">
          <DiagramComponent />
        </article>
      </main>
      <footer>
        <p>&copy; Copyright 2050 de nadie. Todos los derechos revertidos.</p>
      </footer>
    </div>
  );
}
export default App;