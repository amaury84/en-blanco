// helper matriz

export const crearMatriz = (topologias = []) => {
  if (topologias?.length > 0) {
    const matriz = [];
    matriz.length = 0; // Limpiar la matriz si ya contiene datos

    // Definir el orden de los campos que quieres tomar en cuenta
    const ordenCampos = [
      "IpEquipoDestino", "EquipoDestino", "UbicacionEquipoDestino", "TrunkDest", "Tecnologia", 
      "TrkRx1", "EquipoTx1", "TrkTx1", "TrkRx2", "EquipoTx2", "TrkTx2", "TrkRx3", 
      "EquipoTx3", "TrkTx3", "TrkRx4", "EquipoTx4", "TrkTx4", "TrkRx5", 
      "EquipoTx5", "TrkTx5", "TrkROU", "EquipoROU", "UbicacionEquipoROU", "IpEquipoROU"
    ];

    // Excepciones: campos que no deben ser tomados en cuenta
    const excepciones = [
      "_id", "IpEquipoDestino", "UbicacionEquipoDestino", "UbicacionEquipoROU", 
      "IpEquipoROU", "Tecnologia", "createdAt", "updatedAt"
    ];

    topologias.forEach((topologia) => {
      const fila = [];
      const valores = [];

      // Recorrer en el orden de los campos definidos y verificar que no estén en excepciones
      ordenCampos.forEach((campo) => {
        const valor = topologia[campo];

        // Si el campo no está en excepciones y tiene un valor, lo agregamos
        if (!excepciones.includes(campo) && valor !== undefined && valor !== "") {
          valores.push(valor);
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
