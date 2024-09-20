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
  let nodosConexion = [];
  const puertosEnt1 = [];
  const puertosSal1 = [];

  const conexionesNodos = () => {
    if (equiposDestino.length > 0) {
      const equipoDestino = equiposDestino[0];
  
      puertosEnt1.forEach((puerto, index) => {
        const equipoROU = equiposROU[index % equiposROU.length];
        if (equipoROU) {
          nodosConexion.push({
            from: equipoDestino,
            to: equipoROU,
            textLeft: puerto,
            textRight: puertosSal1[index % puertosSal1.length], // Conecta usando puertosSal1 en el lado derecho del ROU
          });
        }
      });
  
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
      console.log("Puertos Entrada 1:", puertosEnt1);
      console.log("Puertos Salida 1:", puertosSal1);
    }
  };

  const obtenerImagen = (equipo) => {
    if (equipo.includes("ZAC")) {
      return "/imagenes/zte.png";
    } else if (equipo.includes("HAC")) {
      return "/imagenes/huawei.png";
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
    const ObjEquiposDestino = equiposDestino.map((equipo, index) => ({
      key: equipo,
      img: obtenerImagen(equipo),
      loc: `0 ${index * 10}`,
    }));

    const ObjEquiposROU = equiposROU.map((equipo, index) => ({
      key: equipo,
      img: obtenerImagenBng(equipo),
      loc: `${500} ${index * 150}`, // Posición ajustada del ROU y el espacio con el otro equipo
    }));

    const nodosTemp = [
      ...ObjEquiposDestino,
      ...ObjEquiposROU,
    ];

    console.log("Nodos Temporales:", nodosTemp); // Imprime los nodos temporales

    setNodes(nodosTemp);
    setNodesConection(nodosConexion);
  };

  useEffect(() => {
    axios
      .get("http://172.31.33.33:5000/topologias", {
        params: { query: consulta, tecnologia: tecnologia },
      })
      .then((response) => {
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
        margin: 10,
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
