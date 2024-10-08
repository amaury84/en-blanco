import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Estilos/Login.module.css"; // Asegúrate de tener los estilos correctos en este archivo

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito/error

  const onSubmit = async (data) => {
    try {
       await axios.post ("http://172.31.33.33:5000/usuarios", {
        usser: data.usser,
        Password: data.Password,       
      });
      setMensaje("Usuario OK"); // Mostrar mensaje de éxito.

    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado que no está en el rango de 2xx
        if (error.response.status === 404) {
          setMensaje("Usuario incorrecto"); // Usuario no encontrado
         
        } else if (error.response.status === 401) {
          setMensaje("Contraseña incorrectos"); // Contraseña no coincide
        } else {
          setMensaje("Error desconocido"); // Otros errores
        }
      } else if (error.request) {
        // La solicitud fue hecha, pero no se recibió respuesta
        setMensaje("No se pudo conectar al servidor."); // Manejo de errores de conexión
      } else {
        // Algo pasó al configurar la solicitud
        setMensaje("Error en la solicitud: " + error.message);
      }
    }
  };

  return (
    <div className={styles.contenedorBody}>
      <div className={styles.contenedorLogin}>
        <div className={styles.overlay}></div>
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="usser">usser</label>
            <input
              className={styles.inputForm}
              name="usser"
              type="text"
              {...register("usser", { required: "Este campo es requerido" })} // Registro del input
            />
            {errors.usser && (
              <p className={styles.error}>{errors.usser.message}</p>
            )}{" "}
            {/* Mostrar error de usuario */}
            <label htmlFor="Password">Contraseña</label>
            <input
              className={styles.inputForm}
              name="Password"
              type="password"
              {...register("Password", { required: "Este campo es requerido" })} // Registro del input
            />
            {errors.Password && (
              <p className={styles.error}>{errors.Password.message}</p>
            )}{" "}
            {/* Mostrar error de contraseña */}
            <button type="submit" className={styles.botonLogin}>
              ENTRAR
            </button>
          </form>

          {/* Mostrar el mensaje de resultado (éxito o error) */}
          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};



export default Login;
