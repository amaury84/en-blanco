import React, { useEffect, useRef, useState } from 'react';
import * as go from 'gojs';
import axios from 'axios';

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

  const conexionesNodos = () => {
    if (equiposDestino.length > 0 && equipos1Tx.length > 0) {
      const equipoDestino = equiposDestino[0];

      // Conectar EquipoDestino a EquipoTx1
      equipos1Tx.forEach(equipoTx1 => {
        nodosConexion.push({ from: equipoDestino, to: equipoTx1 });

        if (equipos2Tx.length > 0) {
          // Si Tx2 existe, conectar Tx1 a Tx2 y luego Tx2 a EquipoROU
          equipos2Tx.forEach(equipoTx2 => {
            nodosConexion.push({ from: equipoTx1, to: equipoTx2 });
            equiposROU.forEach(equipoROU => {
              nodosConexion.push({ from: equipoTx2, to: equipoROU });
            });
          });
        } else {
          // Si Tx2 no existe, conectar Tx1 directamente a EquipoROU
          equiposROU.forEach(equipoROU => {
            nodosConexion.push({ from: equipoTx1, to: equipoROU });
          });
        }
      });
    }
  };

  const estructurar = (topologias = []) => {
    if (topologias.length > 0) {
      topologias.forEach(topologia => {
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
      });
    }
  };

  
  const obtenerImagen = (equipo) => {
    if (equipo.includes('ZAC') || equipo.includes('HAC') || equipo.includes('NAC')) {
      return '/imagenes/OLT.png';
    } else {
      return '/imagenes/cmts.png';
    }
  };

  const obtenerImagen1Tx = (equipo) => {
    if (!equipo) {
      return ''; // Si el equipo no existe lo omite
    }
    if (equipo.includes('CAJA') || equipo.includes('ODF') || equipo.includes('FOL')) {
      return null;
    } else if (equipo.includes('AAC')) {
      return '/imagenes/switch.png';
    } else {
      return '/imagenes/EQUIPO.png';
    }
  };

  const obtenerImagenBng = (equipo) => {
    if (equipo.includes('THBH')) {
      return '/imagenes/thbh (1).png';
    } else {
      return '/imagenes/receptor.png';
    }
  };

  const actualizarGrafica = () => {
    const ObjEquiposDestino = [...equiposDestino].map((equipo) => {
      return { key: equipo, img: obtenerImagen(equipo),location: new go.Point(600, 350), };
    });
   
    const ObjEquipos1Tx = equipos1Tx.map((equipo) => {
      return { key: equipo || '', img: obtenerImagen1Tx(equipo) };
    });
    const ObjEquipos2Tx = equipos2Tx.map((equipo) => {
      return { key: equipo || '', img: obtenerImagen1Tx(equipo) };
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, img: obtenerImagenBng(equipo) };
    });
   
    const nodosTemp = [...ObjEquiposDestino, ...ObjEquiposROU, ...ObjEquipos1Tx, ...ObjEquipos2Tx]
    setNodes(nodosTemp);
    setNodesConection(nodosConexion);

    const nodosValidos = nodosTemp.filter(nodo => nodo.key && nodo.img !== undefined);

    setNodes(nodosValidos);
    setNodesConection(nodosConexion);
  }

  useEffect(() => {
    console.log('Consulta enviada:', consulta);
    console.log('Tecnología enviada:', tecnologia);
  
    axios.get('http://localhost:5000/topologias', {
      params: { query: consulta, tecnologia: tecnologia }
    })
      .then(response => {
        console.log('Datos recibidos:', response.data);
        estructurar(response.data);
        conexionesNodos(response.data);
        conexionesNodos();
        actualizarGrafica();
      })
      .catch(error => {
        console.error('There was an error fetching the nodes!', error);
      }); 
  }, [consulta, tecnologia]);

  useEffect(() => {
    if (nodes.length === 0) return;
  
    const $ = go.GraphObject.make;
  
    if (diagramInstance.current) {
      diagramInstance.current.div = null;
    }
  
    const myDiagram = $(go.Diagram, diagramRef.current, {
      allowDelete: false,
      allowCopy: false,
      'layout': $(go.ForceDirectedLayout, { isInitial: true
      }),
      'undoManager.isEnabled': true,
    });

  
    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical',
      { 
        layoutConditions: go.LayoutConditions.Standard & ~go.LayoutConditions.NodeSized,
        fromSpot: go.Spot.LeftRightSides,
        toSpot: go.Spot.LeftRightSides,///con estas pude colocar los enlaces separados
      },
      {
        row: 1,
        column: 1,
        name: 'BODY',
        stretch: go.Stretch.Fill,
      },
      
      $(
        go.Picture,
        {
          margin: 8, 
          width: 50, 
          height: 50,
          visible: false,  
        },
        new go.Binding('source', 'img'),
        new go.Binding('visible', 'img', img => img !== null) 
      ),
      $(
        go.TextBlock,
        { 
          margin: 8, 
          textAlign: 'center', 
          font: '14px ARIAL', 
          stroke: 'white',
          alignment: go.Spot.Center,  // centrar el nodo de los odf
        },
        new go.Binding('text', 'key'),
        new go.Binding('alignment', 'img', img => img ? go.Spot.Bottom : go.Spot.Center)  // ajustar el texto de las imagenes
      ),
      $(
        go.Panel,
        'Table',
        { margin: 8, stretch: go.Stretch.Fill },
        $(go.RowColumnDefinition, { row: 0, sizing: go.Sizing.None })
      )
    );
  
    myDiagram.linkTemplate = $(go.Link,
      {
        selectionAdorned: true,
        layerName: 'Background',
        reshapable: true,
        routing: go.Routing.AvoidsNodes,
        corner: 5,
      },
      $(go.Shape,
        { stroke: '#ffffff', strokeWidth: 2 }
      ),
      $(go.TextBlock,
        {
          textAlign: 'center',
          font: 'bold 14px sans-serif',
          stroke: 'black',
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Orientation.Upright,
        },
        new go.Binding('text', 'text')
      ),
      $(go.TextBlock,
        {
          textAlign: 'center',
          font: 'bold 14px sans-serif',
          stroke: 'black',
          segmentIndex: -1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Orientation.Upright,
        },
        new go.Binding('text', 'toText')
      ),

      /////intento organizar los nodos de manera automatica para que no se vean desordenados por todo el diagrama
      $(go.Panel,
        'Table',
        { margin: 8, stretch: go.Stretch.Fill },
        $(go.RowColumnDefinition, { row: 0, sizing: go.Sizing.None })
        // $(go.RowColumnDefinition, { row: 1, sizing: go.Sizing.None }), // Define the row for items
        // $(go.RowColumnDefinition, { row: 2, sizing: go.Sizing.None }), // Define the row for inherited item    
      )
    );
  
    myDiagram.model = new go.GraphLinksModel(
      nodes,
      nodesConection,
      // copiesArrays: true,
      // copiesArrayObjects: true,
      
    );
  
    diagramInstance.current = myDiagram;
  
    return () => {
      myDiagram.div = null;
    };
  }, [nodes, nodesConection]);
  

  return <div
    ref={diagramRef}
    style={{
      width: '100%',
      height: '350px',
      border: '1px solid black',
      backgroundColor: 'rgb(17, 24, 39)',
    }}
  ></div>;
};

export default DiagramComponent;