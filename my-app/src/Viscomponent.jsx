import { Network } from "vis-network";
import "./Estilos/Viscomponent.css";
import { useEffect, useState } from "react";
import { getTopologias } from "./services/apiService";
import { crearMatriz } from "./helpers/matrizDataVis";

export const Viscomponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);
  const [matrizDataVis, setMatrizDataVis] = useState([]);

  const getData = async () => {
    try {
      const datos = await getTopologias(query, tecnologia);
      console.log("datos obtenidos:", datos);
      setData(datos);
      const visMatriz = crearMatriz(datos);
      setMatrizDataVis(visMatriz);
    } catch (err) {
      console.log("Error al obtener los datos:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [query, tecnologia]);

  useEffect(() => {
    if (matrizDataVis.length > 0) {
      const container = document.getElementById("network");

      const options = {
        autoResize: true,
        height: "100%",
        width: "100%",
        physics: { enabled: true, wind: { x: 1, y: 0 } },
        solver: 'barnesHut', 
        barnesHut: {
          gravitationalConstant: -8000, // Ajusta la fuerza de atracción entre nodos
          centralGravity: 0.3, // Ajusta la gravedad central
          springLength: 200, // Ajusta la longitud de los enlaces
          springConstant: 0.04, // Ajusta la rigidez de los enlaces
          avoidOverlap: 1 // Evita la superposición de nodos
        },
        stabilization: {
          enabled: true,
          iterations: 1000, // Iteraciones para estabilizar los nodos
          updateInterval: 25,
          onlyDynamicEdges: false,
          fit: true
        },

        layout: {
          randomSeed: 0,
          improvedLayout: false,
        },

        nodes: {
          borderWidth: 7,
          borderWidthSelected: 1,
          shape: "dot",
          color: {
            border: "#0d1b2a",
            background: "#c1121f",
          },
          font: {
            size: 8,
            color: "c1121f",
          },
          physics: true,
        },
        edges: {
          arrows: {
            to: {
              type: "arrow",
              enabled: true,
              scaleFactor: 0.3,
             
            },
          },
          font:
          {
            size: 5,
            color: "#c1121f",
          },
          physics: true,
        },
      };

      var nodes = [];
      var nodeIds = {};
      let nodeIdCounter = 1;
      let firstNodeId = null;
      let lastNodeId = null;

      matrizDataVis.forEach((row, index) => {
        // Verifica el primer nodo
        if (!nodeIds[row[0]]) {
          const isException = ["FOL" ].some((keyword) =>
            row[0].toUpperCase().includes(keyword)
          );
          nodeIds[row[0]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[0]],
            label: row[0],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[0]),
            color: isException
              ? { background: "black", border: "white" }
              : undefined,
            font: {
              color: "black",
              align: isException ? "center" : "top",
            },
          });
          if (index === 0) {
            firstNodeId = nodeIds[row[0]]; // Establece el primer nodo
          }
        }

        // Verifica el último nodo
        if (row[3] && !nodeIds[row[3]]) {
          const isException = ["FOL"].some((keyword) =>
            row[3].toUpperCase().includes(keyword)
          );

          nodeIds[row[3]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[3]],
            label: row[3],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[3]),
          });
          lastNodeId = nodeIds[row[3]]; // Establece el último nodo
        }
      });

      // Supongamos que tienes un array `data` y otro `nodes`
      let totalLinkLength = 0;
      data.forEach((item) => {
        // Ajusta el cálculo de la longitud del enlace según sea necesario
        let linkLength = item.length || 100; // Valor predeterminado si 'length' no está definido
        totalLinkLength += linkLength;
      });

      // Especifica una distancia que quieres aplicar entre nodos
      const distanceBetweenNodes = 180; // Cambia este valor según tu necesidad
      const nodeSpacing = nodes.length * distanceBetweenNodes;

      // Reposiciona los nodos
      nodes = nodes.map((node) => {
        if (node.id === firstNodeId) {
          return { ...node, fixed: true, x: 0, y: 0 };
        }
        if (node.id === lastNodeId) {
          return { ...node, fixed: true, x: nodeSpacing, y: 0 };
        }
        return node;
      });

      var minRoundness = 0.1;  // Valor mínimo de roundness
      var maxRoundness = 0.8;  // Valor máximo de roundness
      
      var edges = matrizDataVis.map((row, index) => {
        if (row[3]) {
          var fromNode = nodeIds[row[0]];
          var toNode = nodeIds[row[3]];
          var salPort = row[1];
          var llegPort = row[2];
          var path = `${salPort} → ${llegPort}`;
      
          // Calcular roundness basado en el índice
          var roundness = minRoundness + (maxRoundness - minRoundness) * (index / (matrizDataVis.length - 1));
      
          return {
            from: fromNode,
            to: toNode,
            label: path,
            font: {
              align: "bottom",
              color: "#6a040f",
              size: 10,
              strokeColor: "#e0e1dd",
            },
            smooth: {
              type: 'curvedCW',
              roundness: roundness
            },
          };
        }
        return null;
      }).filter((edge) => edge !== null);
      
      const networkData = {
        nodes: nodes,
        edges: edges,
      };
      new Network(container, networkData, options);
          }
  }, [matrizDataVis]);

  function gimag(label) {
    const upperLabel = label.toUpperCase();
    switch (true) {
      case upperLabel.includes("ZAC"):
        return "/imagenes/zte.png";
      case upperLabel.includes("HAC"):
        return "/imagenes/huawei.png";
      case upperLabel.includes("NAC"):
        return "/imagenes/nokia.png";
      case upperLabel.includes("NGW"):
        return "/imagenes/alcatel.jpg";
      case upperLabel.includes("AAG"):
        return "/imagenes/AAG.png";
      case upperLabel.includes("THBH"):
        return "/imagenes/thbh (1).png";
      
      case ["FOL", "ODF", "CAJA", "RACK"].some((keyword) =>
        upperLabel.includes(keyword)
      ):

      case upperLabel.includes("IPRAN"):
        return "/imagenes/ipran.jfif"; // No image for exceptions
      default:
        return "/imagenes/OLT 2.png";
    }
  }

  return <div id="network" style={{ width: "100%", minHeight: "500px" }}></div>;
};
