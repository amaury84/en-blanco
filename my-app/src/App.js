import React, { useState } from "react";
import axios from "axios";
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
  const [sugerencias, setSugerencias] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation(); // Para obtener la ruta actual
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setConsulta(value); // Actualiza el estado con el input del usuario

    // Realiza la búsqueda en la base de datos solo si hay más de un carácter
    if (value.length >1) {
      try {
        const response = await axios.get(
          `http://172.31.33.33:5000/topologias?query=${value}`
        );
        setSugerencias(response.data); // Actualiza las sugerencias basadas en la respuesta
      } catch (error) {
        console.error("Error al obtener las sugerencias:", error);
      }
    } else {
      setSugerencias([]); // Limpia las sugerencias si el input es corto
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setConsulta(suggestion.EquipoDestino); // Llena el input con la sugerencia seleccionada
    setSugerencias([]); // Limpia las sugerencias
  };

  const handleSelectChange = (event) => {
    setTecnologia(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConsultaGuardada(consulta); // Guarda la consulta actual
    // Aquí puedes realizar la búsqueda en la base de datos, si es necesario
  };

  return (
    <div>
      {isLoggedIn ? (
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
              ></a>
  
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
                    Usuarios{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-people"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                    </svg>
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
            <Link to="/" className="cuadroBotones">
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
          location.pathname !== "/" && (
            <>
              <main>
                <div className={styles.todoContenedorInicio}>
                  <div className={styles.barraLateral}>
                    <nav>
                      <form
                        className={styles.FormularioBusquedaInicial}
                        onSubmit={handleSubmit}
                      >
                        <h1>BUSQUEDA DE EQUIPO</h1>
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
                      {/* Mostrar sugerencias */}
                      {sugerencias.length > 0 && (
                        <ul className={styles.sugerencias}>
                          {sugerencias.map((suggestion) => (
                            <li
                              key={suggestion._id}
                              onClick={() => handleSelectSuggestion(suggestion)}
                              className={styles.sugerenciaItem}
                            >
                              {suggestion.EquipoDestino}
                            </li>
                          ))}
                        </ul>
                      )}
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
  
                      <ul>
                        <h1>
                          Contenido Relacionado
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-box-arrow-in-up-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"
                            />
                          </svg>
                        </h1>
                        <li>
                          <a
                            href="https://claromovilco.sharepoint.com/sites/PROYECTOSCERTIFICACIONUNIDADHOGARES"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint Certificación
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://claromovilco.sharepoint.com/sites/ProyectoPlaneacinyDiseoMINTIC/Documentos%20compartidos/Forms/AllItems.aspx?ga=1&amp;OR=Teams%2DHL&amp;CT=1677249475388&amp;clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMzAxMDEwMDkxMyIsIkhhc0ZlZGVyYXRlZFVzZXIiOnRydWV9&amp;id=%2Fsites%2FProyectoPlaneacinyDiseoMINTIC%2FDocumentos%20compartidos%2FGeneral%2FENTREGA%5FOPERACION%2FOLTs%5F2021%2D2022%2D2023&amp;viewid=398360b1%2D7bec%2D4903%2D9f16%2D8f2499c1cc7e"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint Implementación FTTH
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://claromovilco.sharepoint.com/sites/JEFATURABACKOFFICEALAMBRICO/Documentos%20compartidos/Forms/AllItems.aspx?id=%2Fsites%2FJEFATURABACKOFFICEALAMBRICO%2FDocumentos%20compartidos%2FBITACORA%2FFTTH%2F3%2E%20ATPs&amp;p=true&amp;ga=1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint OLT´s Back Office
                          </a>
                        </li>
  
                        <li>
                          <a
                            href="https://claromovilco-my.sharepoint.com/:x:/r/personal/38104043_claro_com_co/_layouts/15/Doc.aspx?sourcedoc=%7B46C8D849-8235-400B-9905-FEDBCD46882C%7D&amp;file=OLT%20llineales.xlsx&amp;wdLOR=c4235A2FB-1F77-4380-BC04-A16FE2E08C41&amp;fromShare=true&amp;action=default&amp;mobileredirect=true"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Sharepoint OLT´s Lineales
                          </a>
                        </li>
                        <li>
                          <a
                            href="http://172.31.33.21/index.php#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Página Otto
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
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
