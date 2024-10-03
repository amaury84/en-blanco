import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "./Estilos/Login.module.css";

const Login = () => {
  // Inicializamos useForm
  const { register, handleSubmit } = useForm();

  // Función que manejará el envío del formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.contenedorBody}>
      {/* Overlay transparente y fondo */}
      <div className={styles.contenedorLogin}>
        {/* Overlay transparente */}
        <div className={styles.overlay}></div>

        {/* Contenido del formulario */}
        <div className={styles.contenido}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Iniciar Sesión</h2>

            <label htmlFor="name">Usuario</label>
            <input
              className={styles.inputForm}
              name="user"
              type="text"
             
              {...register('name')}
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              className={styles.inputForm}
              name="contrasena"
              type="password"
             
              {...register('contrasena')}
            />


            <button type="submit">
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
