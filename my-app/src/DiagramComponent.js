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

  let nodosConexion = [];

  const conexionesNodos = () => {
    if (equiposDestino.length > 0 && equiposROU.length > 0) {
      const cnFrom = equiposDestino[0];
      nodosConexion = equiposROU.map((equipo) => {
        return { from: cnFrom, to: equipo }
      });
    }
    console.log(nodosConexion);
  }

  const estructurar = (topologias = []) => {
    console.log(topologias);
    if (topologias.length > 0) {

      equiposDestino.push(topologias[0].EquipoDestino);
      equiposROU.push(topologias[0].EquipoROU);
      topologias.forEach(topologia => {
        // if(equiposDestino[0] != topologia.EquipoDestino) {
        if (!equiposDestino.includes(topologia.EquipoDestino)) {
          equiposDestino.push(topologia.EquipoDestino);
          puertosEquiposDestino.push(topologia.TrunkDest);
        }

        if (!equiposROU.includes(topologia.EquipoROU)) {
          equiposROU.push(topologia.EquipoROU);
        }

      });


      console.log(equiposDestino);
      console.log(equiposROU);


      const puertosEquiposDestino = topologias.map((topologia) => {
        return topologia.TrunkDest;
      });

      const puertosEquiposROU = [];
      equiposROU.forEach((equipo) => {
        const puertosEquiposROUTemp = topologias
          .filter((topologia) => equipo === topologia.EquipoROU)
          .map((topologia) => topologia.TrkROU);

        puertosEquiposROU.push(puertosEquiposROUTemp);
      });

      //const puertosEquiposROU = topologias.map((topologia) => {
      //return topologia.TrkROU;
      //});

      console.log(puertosEquiposDestino);
      console.log(puertosEquiposROU);
    }
  }

  const actualizarGrafica = () => {

    const ObjEquiposDestino = equiposDestino.map((equipo) => {
      return { key: equipo, color:'lightblue' }
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, color:'lightblue' }
    });
    const nodosTemp = [...ObjEquiposDestino, ...ObjEquiposROU];
    setNodes(nodosTemp);
    setNodesConection(nodosConexion);
  }

  useEffect(() => {
    console.log(consulta);

    if (consulta == "") {
      consulta = "";
    }

    // Obtener los nodos desde el backend
    axios.get('http://localhost:5000/topologias', {
      params: { query: consulta }
    })
      .then(response => {
        // setNodes(response.data);
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

    // Limpiar el diagrama anterior si existe
    if (diagramInstance.current) {
      diagramInstance.current.div = null;
    }

    // Crear el nuevo diagrama con TreeLayout
    const myDiagram = $(go.Diagram, diagramRef.current, {
      'layout': $(go.TreeLayout), // Aplicar TreeLayout
      'undoManager.isEnabled': true
    });

    // Plantilla de nodos
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

    // Plantilla de enlaces (sin flechas)
    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes, corner: 10 }, // Usar go.Link.AvoidsNodes
      $(
        go.Shape,
        { strokeWidth: 2, stroke: '#333' }
      )
    );


    // Definir el modelo de datos
    myDiagram.model = new go.GraphLinksModel(
      nodes,
      nodesConection
    );


    // Guardar la instancia del diagrama
    diagramInstance.current = myDiagram;

    // Limpiar el diagrama al desmontar el componente
    return () => {
      myDiagram.div = null;
    };

  }, [nodes, nodesConection]);

  return <div ref={diagramRef} style={{ width: '100%', height: '350px', border: '1px solid black' }}></div>;
};

export default DiagramComponent;
