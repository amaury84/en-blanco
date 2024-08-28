//helper matriz

export const crearMatriz = (topologias = []) => {
  if (topologias?.length > 0) {
    const matriz = [];
    matriz.length = 0; // Limpiar la matriz si ya contiene datos

    topologias.forEach((topologia) => {
      const fila = [];
      const valores = [];

      // Extraer valores del objeto ignorando las excepciones
      Object.keys(topologia).forEach((key) => {
        if (!["_id", "IP", "Tecnologia"].includes(key)) {
          valores.push(topologia[key]);
        }
      });

      // Crear grupos de cuatro, reiniciando el ciclo por cada nuevo objeto
      for (let i = 0; i < valores.length; i += 3) {
        // i+=3 porque el 4º será reusado en la próxima fila
        const fila = [];

        for (let j = 0; j < 4; j++) {
          const index = i + j;
          if (index < valores.length) {
            fila.push(valores[index]);
          } else {
            fila.push(""); // Si no hay más datos, agrega un valor vacío
          }
        }

        matriz.push(fila);
      }
    });

    console.log("Matriz helper:", matriz);
    return matriz;
  }
  console.log("topologias helper", topologias);
  return topologias;
};
