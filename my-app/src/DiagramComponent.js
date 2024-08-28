import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import axios from "axios";

const DiagramComponent = ({ consulta, tecnologia }) => {
  const diagramRef = useRef(null);
  const diagramInstance = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [nodesConection, setNodesConection] = useState([]);

  const equiposDestino = [];
  const equiposROU = [];
  const equipos1Tx = [];
  const equipos2Tx = [];
  let nodosConexion = [];
  const puertosEnt1 = [];
  const puertosSal1 = [];


  const conexionesNodos = () => {
    if (equiposDestino.length > 0) {
      const equipoDestino = equiposDestino[0];
  
      if (equipos1Tx.length > 0) {
        // Si existe Tx1
        puertosEnt1.forEach((puerto, index) => {
          const equipoTx1 = equipos1Tx[index % equipos1Tx.length];
  
          if (equipoTx1) {
            nodosConexion.push({
              from: equipoDestino,
              to: equipoTx1,
              textLeft: puerto,
            });
  
            if (equipos2Tx.length > 0) {
              // Si existe Tx2
              const equipoTx2 = equipos2Tx[Math.floor(index / equipos1Tx.length) % equipos2Tx.length];
              if (equipoTx2) {
                nodosConexion.push({
                  from: equipoTx1,
                  to: equipoTx2,
                });
  
                const equipoROU = equiposROU[Math.floor(index / (equipos1Tx.length * equipos2Tx.length)) % equiposROU.length];
                if (equipoROU) {
                  nodosConexion.push({
                    from: equipoTx2,
                    to: equipoROU,                    
                    textRight: puertosSal1[index % puertosSal1.length], // Conecta usando puertosSal1 en el lado izquierdo del ROU
                  });
                }
              }
            } else {
              // No existe Tx2, conecta Tx1 directamente a ROU
              const equipoROU = equiposROU[Math.floor(index / equipos1Tx.length) % equiposROU.length];
              if (equipoROU) {
                nodosConexion.push({
                  from: equipoTx1,
                  to: equipoROU,               
                  textRight: puertosSal1[index % puertosSal1.length], // Conecta usando puertosSal1 en el lado izquierdo del ROU
                });
              }
            }
          }
        });
      } else {
        // No existe Tx1, conecta EquipoDestino directamente a ROU
        puertosEnt1.forEach((puerto, index) => {
          const equipoROU = equiposROU[index % equiposROU.length];
          if (equipoROU) {
            nodosConexion.push({
              from: equipoDestino,
              to: equipoROU,
              textLeft: puerto,
              
              textLeft: puertosSal1[index % puertosSal1.length], // Conecta usando puertosSal1 en el lado izquierdo del ROU
            });
          }
        });
      }
  
      console.log('Conexiones de Nodos:', nodosConexion); // Imprime las conexiones de nodos
    }
  };
  
  

  const estructurar = (topologias = []) => {
  if (topologias.length > 0) {
    topologias.forEach((topologia) => {
      if (!equiposDestino.includes(topologia.EquipoDestino)) {
        equiposDestino.push(topologia.EquipoDestino);
      }
      if (!equiposROU.includes(topologia.EquipoROU)) {
        equiposROU.push(topologia.EquipoROU);
      }
      if (!equipos1Tx.includes(topologia.EquipoTx1)) {
        equipos1Tx.push(topologia.EquipoTx1);
      }
      if (topologia.EquipoTx2 && !equipos2Tx.includes(topologia.EquipoTx2)) {
        equipos2Tx.push(topologia.EquipoTx2);
      }
      if (!puertosEnt1.includes(topologia.TrunkDest)) {
        puertosEnt1.push(topologia.TrunkDest);
      }
      if (!puertosSal1.includes(topologia.TrkROU)) {
        puertosSal1.push(topologia.TrkROU);
      }
    });

    // Imprime los datos estructurados para depuración
    console.log("Datos de la Base de Datos:", topologias);
    console.log("Equipos Destino:", equiposDestino);
    console.log("Equipos ROU:", equiposROU);
    console.log("Equipos Tx1:", equipos1Tx);
    console.log("Equipos Tx2:", equipos2Tx);
    console.log("Puertos Entrada 1:", puertosEnt1);
    console.log("Puertos Salida 1:", puertosSal1);
    console.log("Matriz:", matriz);
  }
};


  const obtenerImagen = (equipo) => {
    if (
      equipo.includes("ZAC") 
    ) {
      return "/imagenes/zte.png";
    } else if(
    equipo.includes("HAC") 
    ){
      return "/imagenes/huawei.png";
    }else{
      return "/imagenes/OLT 2.png";
    }
  };

  const obtenerImagen1Tx = (equipo) => {
    if (!equipo) {
      return " "; // Si el equipo no existe lo omite
    }
    if (
      equipo.includes("CAJA") ||
      equipo.includes("ODF") ||
      equipo.includes("FOL") ||
      equipo.includes("PATCH") ||
      equipo.includes("OB")
    ) {
      return "";
    } else if (equipo.includes("AAC")) {
      return "/imagenes/switch.png";
    } else {
      return "/imagenes/OLT 2.png";
    }
  };

  const obtenerImagenBng = (equipo) => {
    if (equipo.includes("THBH")) {
      return "/imagenes/thbh (1).png";
    } else {
      return "/imagenes/receptor.png";
    }
  };

  const actualizarGrafica = () => {
    const x1Pos = equipos2Tx.length > 0 ? 400 : 600; // Ajusta la posición de Tx1 si no hay Tx2
    const x2Pos = 800;
    const rouPos = equipos2Tx.length > 0 ? 1200 : 1000; // Ajusta la posición del ROU si no hay Tx2

    const centerY = 10; // Coordenada Y central de la ventana
    const separation = 90; // Espacio entre nodos

    // Calcular la posición central para Tx1
    const totalTx1 = equipos1Tx.length;
    const startY1 = centerY - (totalTx1 - 1) * (separation / 2); // Posición inicial para centrar los nodos

    const ObjEquiposDestino = equiposDestino.map((equipo, index) => ({
      key: equipo,
      img: obtenerImagen(equipo),
      loc: `0 ${index * 200}`,
    }));

    const ObjEquipos1Tx = equipos1Tx.map((equipo, index) => ({
      key: equipo || "",
      img: obtenerImagen1Tx(equipo),
      loc: `${x1Pos} ${startY1 + index * separation}`, // Posición ajustada para centrar los nodos
    }));

    const ObjEquipos2Tx = equipos2Tx.map((equipo, index) => ({
      key: equipo || "",
      img: obtenerImagen1Tx(equipo),
      loc: `${x2Pos} ${index * 200}`, // Posición fija para Tx2
    }));

    const ObjEquiposROU = equiposROU.map((equipo, index) => ({
      key: equipo,
      img: obtenerImagenBng(equipo),
      loc: `${rouPos} ${index * 200}`, // Posición ajustada según la existencia de Tx2
    }));

    const nodosTemp = [
      ...ObjEquiposDestino,
      ...ObjEquipos1Tx,
      ...ObjEquipos2Tx,
      ...ObjEquiposROU,
    ];

    console.log("Nodos Temporales:", nodosTemp); // Imprime los nodos temporales

    setNodes(nodosTemp);
    setNodesConection(nodosConexion);
  };

  const matriz = [];
  const agregarFilaAMatriz = (topologias) => {
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

    console.log("Matriz:", matriz); // Imprime la matriz
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/topologias", {
        params: { query: consulta, tecnologia: tecnologia },
      })
      .then((response) => {
        agregarFilaAMatriz(response.data);
        estructurar(response.data);
        conexionesNodos();
        actualizarGrafica();
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los nodos!", error);
      });
  }, [consulta, tecnologia]);

  useEffect(() => {
    if (nodes.length === 0) return;

    const $ = go.GraphObject.make;

    if (diagramInstance.current) {
      diagramInstance.current.div = null;
    }

    const myDiagram = $(go.Diagram, diagramRef.current, {
      "undoManager.isEnabled": true,
      layout: $(go.Layout), // Layout vacío para desactivar el layout automático
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      "Vertical",
      {
        width: 200, // Ancho fijo
        height: 100, // Alto fijo
        fromSpot: go.Spot.LeftRightSides,
        toSpot: go.Spot.LeftRightSides,
      },
      $(
        go.Picture,
        {
          margin: 8,
          width: 50,
          height: 50,
          visible: false,
        },
        new go.Binding("source", "img"),
        new go.Binding("visible", "img", (img) => img !== null)
      ),
      $(
        go.TextBlock,
        {
          margin: 6,
          textAlign: "center",
          font: "14px ARIAL",
          stroke: "white",
          alignment: go.Spot.Center,
        },
        new go.Binding("text", "key"),
        new go.Binding("alignment", "img", (img) =>
          img ? go.Spot.Bottom : go.Spot.Center
        )
      ),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ) // Asigna la posición manualmente
    );

    myDiagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Routing.Normal, // Evita que las líneas pasen por encima de los nodos
        relinkableFrom: true,
        relinkableTo: true,
      },
      $(
        go.Shape,
        { stroke: "#ffffff", strokeWidth: 2 } // Define el color y grosor del enlace
      ),
      $(
        go.TextBlock,
        {
          textAlign: "center",
          font: "bold 8px sans-serif",
          stroke: "white",
          segmentIndex: 0, // Posiciona el texto hacia el final del enlace (a la derecha)
          segmentOffset: new go.Point(NaN, NaN),
        },
        new go.Binding("text", "textLeft")
      ),
      // Elimina o comenta la siguiente línea para quitar la flecha del enlace
      // $(go.Shape,
      //   { toArrow: 'Standard', strokeWidth: 0, fill: '#ffffff' }
      // ),
      $(
        go.TextBlock,
        {
          textAlign: "center",
          font: "bold 8px sans-serif",
          stroke: "white",
          segmentIndex: -1, // Posiciona el texto hacia el inicio del enlace (a la izquierda)
          segmentOffset: new go.Point(NaN, NaN),
        },
        new go.Binding("text", "textRight")
      )
    );

    myDiagram.model = new go.GraphLinksModel(nodes, nodesConection);
    diagramInstance.current = myDiagram;
  }, [nodes, nodesConection]);

  return (
    <div
      ref={diagramRef}
      style={{ width: "100%", height: "300px", backgroundColor: "#383838" }}
    />
  );
};

export default DiagramComponent;
