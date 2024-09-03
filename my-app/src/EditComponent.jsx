// EditComponent.js
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilos/EditComponent.css";
const EditComponent = () => {
  return (
    <main>
      <div>
        <Link to="/">Inicio</Link> {/* Enlace a la página principal */}
        <br />
        <h1>EDICIÓN DE TOPOLOGÍA</h1>
        
      </div>

      <div className="contenedor1">     
        <div className="row">
       
          <div className="colum">
          <p>Ingrese el nombre de la olt a Editar</p>
            <input type="text" name="busqueda" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditComponent;
