import React, { useEffect, useRef, useState } from 'react';
import * as go from 'gojs';
import axios from 'axios';

const DiagramComponent = ({ consulta }) => {
  const diagramRef = useRef(null);
  const diagramInstance = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [nodesConection, setNodesConection] = useState([]);

  const equiposDestino = [];
  const equiposROU = [];
  const equipos1Tx = [];
  let nodosConexion = [];

  const conexionesNodos = () => {
    if (equiposDestino.length > 0 && equiposROU.length > 0 && equipos1Tx.length > 0) {
      const cnFrom = equiposDestino[0];

      // Conectar equiposDestino a equipos1Tx
      nodosConexion = equipos1Tx.map((equipoTx) => {
        return { from: cnFrom, to: equipoTx }
      });

      // Conectar equipos1Tx a equiposROU
      equipos1Tx.forEach((equipoTx) => {
        equiposROU.forEach((equipoRou) => {
          nodosConexion.push({ from: equipoTx, to: equipoRou });
        });
      });
    }
    console.log(nodosConexion);
  }

  const estructurar = (topologias = []) => {
    console.log(topologias);
    if (topologias.length > 0) {
      equiposDestino.push(topologias[0].EquipoDestino);
      equiposROU.push(topologias[0].EquipoROU);
      equipos1Tx.push(topologias[0].EquipoTx1);
      topologias.forEach(topologia => {
        if (!equiposDestino.includes(topologia.EquipoDestino)) {
          equiposDestino.push(topologia.EquipoDestino);
        }
        if (!equiposROU.includes(topologia.EquipoROU)) {
          equiposROU.push(topologia.EquipoROU);
        }
        if (!equipos1Tx.includes(topologia.EquipoTx1)){
          equipos1Tx.push(topologia.EquipoTx1);
        }
      });
      console.log(equiposDestino);
      console.log(equiposROU);
      console.log(equipos1Tx);
    }
  }

  const actualizarGrafica = () => {
    const ObjEquiposDestino = equiposDestino.map((equipo) => {
      return { key: equipo, color: 'lightgreen' }
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, color: 'pink' }
    });
    const ObjEquipos1Tx = equipos1Tx.map((equipo) => {
      return { key: equipo, color: 'lightblue' }
    });

    const nodosTemp = [...ObjEquiposDestino, ...ObjEquiposROU, ...ObjEquipos1Tx];
    setNodes(nodosTemp);
    setNodesConection(nodosConexion);
  }

  useEffect(() => {
    console.log(consulta);

    if (consulta === "") {
      consulta = "";
    }

    // Obtener los nodos desde el backend
    axios.get('http://localhost:5000/topologias', {
      params: { query: consulta }
    })
      .then(response => {
        console.log(response.data);
        estructurar(response.data);
        conexionesNodos();
        actualizarGrafica();
      })
      .catch(error => {
        console.error('There was an error fetching the nodes!', error);
      });
  }, [consulta]);

  useEffect(() => {
    if (nodes.length === 0) return;

    const $ = go.GraphObject.make;

    if (diagramInstance.current) {
      diagramInstance.current.div = null;
    }

    const myDiagram = $(go.Diagram, diagramRef.current, {
      'layout': $(go.TreeLayout),
      'undoManager.isEnabled': true
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        { strokeWidth: 0 },
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 8 },
        new go.Binding('text', 'key')
      )
    );

    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes, corner: 10 },
      $(
        go.Shape,
        { strokeWidth: 2, stroke: '#333' }
      )
    );

    myDiagram.model = new go.GraphLinksModel(
      nodes,
      nodesConection
    );

    diagramInstance.current = myDiagram;

    return () => {
      myDiagram.div = null;
    };
  }, [nodes, nodesConection]);

  return <div ref={diagramRef} style={{ width: '100%', height: '350px', border: '1px solid black' }}></div>;
};

export default DiagramComponent;
