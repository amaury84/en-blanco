import React, { useState } from "react";
import DiagramComponent from "./DiagramComponent";
import { Viscomponent } from "./Viscomponent";
import TableComponent from "./TableComponent";
import EditComponent from "./EditComponent";
import CrearComponent from "./CrearComponent";
import Login from "./Login";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import styles from "./Estilos/App.module.css";
import "./Estilos/estilosGlobales.css";

const App = () => {
  const [consulta, setConsulta] = useState("");
  const [consultaGuardada, setConsultaGuardada] = useState("");
  const [tec, setTecnologia] = useState("FTTH");

  const location = useLocation(); // Para obtener la ruta actual

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
      <div className="mainContainer">
        <div className="banderaContainer">
          <img
            src="/imagenes/flag-colombia.png"
            alt="Bandera"
            className="bandera"
          />
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >

            </a>

            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Salir ↩ <i className="bi bi-escape"></i>
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Usuarios
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="botonesContainer">
          <Link to="/" className="cuadroBotones">
            Inicio
          </Link>
          <Link to="/crear" className="cuadroBotones">
            Crear
          </Link>
          <Link to="/edit" className="cuadroBotones">
            Editar
          </Link>
          <Link to="/login" className="cuadroBotones">
            Loguear
          </Link>
        </div>
      </div>

      <header>
        <h1>TOPOLOGÍAS DE RED CLARO</h1>
        <img
          src={`${process.env.PUBLIC_URL}/imagenes/claro-logo.png`}
          alt="Claro Logo"
        />
      </header>

      {location.pathname !== "/edit" &&
        location.pathname !== "/crear" &&
        location.pathname !== "/login" && (
          <>
            <main>
              <div className={styles.todoContenedorInicio}>
                <div className={styles.barraLateral}>
                  <nav>
                    <form
                      className={styles.FormularioBusquedaInicial}
                      onSubmit={handleSubmit}
                    >
                      <input
                        className={styles.barraBusqueda}
                        type="text"
                        id="buscador"
                        placeholder="Nombre del equipo"
                        value={consulta}
                        onChange={handleInputChange}
                      />
                      <button className={styles.botonBuscar} type="submit">
                        Buscar
                      </button>
                    </form>

                    <select
                      className={styles.tecnologiaBusqueda}
                      id="tecnologia"
                      value={tec}
                      onChange={handleSelectChange}
                    >
                      <option value="CMTS">CMTS</option>
                      <option value="FTTH">FTTH</option>
                      <option value="FTTO">FTTO</option>
                    </select>
                  </nav>
                  <br />
                  <aside>
                    {consultaGuardada && (
                      <div>
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
                <article className={styles.diagramaContainer}>
                  <DiagramComponent
                    consulta={consultaGuardada}
                    tecnologia={tec}
                  />
                  <Viscomponent query={consultaGuardada} tecnologia={tec} />
                  <TableComponent query={consultaGuardada} tecnologia={tec} />
                </article>
              </div>
            </main>
            <footer>
              <p>&copy; Claro Colombia</p>
            </footer>
          </>
        )}

      <Routes>
        <Route path="/edit" element={<EditComponent />} />
        <Route path="/crear" element={<CrearComponent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
