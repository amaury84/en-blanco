import { Network } from "vis-network";
import "./Viscomponent.css";
import { useEffect, useState } from "react";
import { getTopologias } from "./services/apiService";
import { crearMatriz } from "./helpers/matrizDataVis";

export const Viscomponent = ({ query, tecnologia }) => {
  const [data, setData] = useState([]);
  const [matrizDataVis, setMatrizDataVis] = useState([]);

  const getData = async () => {
    try {
      const datos = await getTopologias(query, tecnologia);
      console.log("datosawa", datos);
      setData(datos);
      const vismatriz = crearMatriz(datos);
      setMatrizDataVis(vismatriz);
    } catch (err) {
      console.log("falla datos consulta");
    }
  };

  useEffect(() => {
    getData();  
  }, [query, tecnologia]);

  useEffect(() => {
    if (matrizDataVis.length > 0) {
      var container = document.getElementById("network");
      var options = {
        nodes: {
          shape: "box",
          size: 30,
          color: {
            border: "black",
            background: "transparent",
          },
          font: {
            size: 15,
            color: "black",
            align: "center",
            face: "arial",
            background: "white",
            strokeColor: "black",
            strokeWidth: 1,
          },
          imagePadding: -10,
        },
        edges: {
          color: "black",
          width: 2,
          smooth: {
            type: "dynamic", 
            roundness: 1, 
          },
          dashes: false,
          arrows: {
            to: { enabled: false },
          },
        },
        physics: {
          stabilization: true,
          barnesHut: {
            gravitationalConstant: -100000,
            centralGravity: 0.1, 
            springLength: 200, 
          },
          repulsion: {
            nodeDistance: 200,
            damping: 0.5, 
          },
        },
      };
  
      var nodes = [];
      var nodeIds = {};
      var nodeIdCounter = 1;
  
      matrizDataVis.forEach((row, index) => {
        if (!nodeIds[row[0]]) {
          const isException = ["FOL", "ODF", "CAJA", "RACK"].some(keyword => row[0].toUpperCase().includes(keyword));
          nodeIds[row[0]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[0]],
            label: row[0],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[0]),
            color: isException ? { background: "white", border: "white" } : undefined,
            font: {
              color: "black",
              align: isException ? "center" : "top",
            },
            x: index === 10 ? 0 : undefined, // Coordenada X para el primer equipo
            y: index === 0 ? 0 : undefined, // Coordenada Y para el primer equipo
          });
        }
        if (row[3] && !nodeIds[row[3]]) {
          const isException = ["FOL", "ODF", "CAJA", "RACK"].some(keyword => row[3].toUpperCase().includes(keyword));
          nodeIds[row[3]] = nodeIdCounter++;
          nodes.push({
            id: nodeIds[row[3]],
            label: row[3],
            shape: isException ? "box" : "image",
            image: isException ? "" : gimag(row[3]),
            color: isException ? { background: "white", border: "white" } : undefined,
            font: {
              color: "black",
              align: isException ? "center" : "top",
            },
          });
        }
      });
      
  
      var edges = [];
      matrizDataVis.forEach((row) => {
        if (row[3]) {
          var fromNode = nodeIds[row[0]];
          var toNode = nodeIds[row[3]];
          var salPort = row[1];
          var llegPort = row[2];
          var path = `${salPort} → ${llegPort}`;
  
          edges.push({
            from: fromNode,
            to: toNode,
            label: path,
            font: {
              align: "center",
              color: "black",
              size: 15,
              background: "white",
            },
            arrows: {
              to: { enabled: false },
            },
          });
        }
      });
  
      var networkData = {
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
      case ["FOL", "ODF", "CAJA", "RACK"].some(keyword => upperLabel.includes(keyword)):
        return ""; // Retornar vacío ya que no se usará imagen.
      default:
        return "/imagenes/OLT 2.png";
    }
  }

  return (
    <>
      <div id="network" style={{ width: "100%", minHeight: "500px" }}></div>
    </>
  );
};
