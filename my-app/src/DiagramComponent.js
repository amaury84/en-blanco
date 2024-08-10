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
  let objRutaConexion = [];

  const rutaConexion = (topologias = []) => {
    if (topologias.length === 0) {
      return;
    }

    topologias.forEach(({EquipoDestino, EquipoROU, TrunkDest, TrkROU, EquipoTx1}) => {
      if (EquipoTx1) {
        console.log("equipo", EquipoTx1);
        // lógica de los nodos.
      } else {
        console.log("No hay equipo tx1", EquipoTx1);
        const ruta = {
          inicial: EquipoDestino,
          node: { from: EquipoDestino, to: EquipoROU },
          final: EquipoROU,
          puerto1: TrunkDest,
          puerto2: TrkROU 
        };
        objRutaConexion.push(ruta);
      }
    });
  }

  // const conexionesNodos = () => {
  //   if (equiposDestino.length > 0 && equiposROU.length > 0) {
  //     const cnFrom = equiposDestino[0];
  
  //     // Conectar equiposDestino a equipos1Tx
  //     nodosConexion = equipos1Tx.map((equipoTx) => {
  //       return { from: cnFrom, to: equipoTx };
  //     });
  
  //     // Conectar equipos1Tx a equipos2Tx
  //     equipos1Tx.forEach((equipoTx) => {
  //       equipos2Tx.forEach((equipoTx2) => {
  //         nodosConexion.push({ from: equipoTx, to: equipoTx2 });
  //       });
  //     });
  
  //     // Conectar equipos2Tx a equiposROU
  //     equipos2Tx.forEach((equipoTx2) => {
  //       equiposROU.forEach((equipoRou) => {
  //         nodosConexion.push({ from: equipoTx2, to: equipoRou });
  //       });
  //     });
  
  //     // Si no hay equipos2Tx, conectar equipos1Tx a equiposROU directamente
  //     if (equipos2Tx.length == 0) {
  //       equipos1Tx.forEach((equipoTx) => {
  //         equiposROU.forEach((equipoRou) => {
  //           nodosConexion.push({ from: equipoTx, to: equipoRou });
  //         });
  //       });
  //     }
  //   }
  //   console.log(nodosConexion);
  // }


  const conexionesNodos = () => {
    if (equiposDestino.length > 0 && equipos1Tx.length > 0 && equiposROU.length > 0) {
      const cnFrom = equiposDestino[0];
  
      if (equipos2Tx.length > 0) {
        // Si Tx2 existe, conectamos: EquipoDestino -> Tx1 -> Tx2 -> ROU
        nodosConexion = equipos1Tx.map((equipoTx1) => ({
          from: cnFrom, 
          to: equipoTx1 
        }));
  
        equipos1Tx.forEach((equipoTx1) => {
          equipos2Tx.forEach((equipoTx2) => {
            nodosConexion.push({ from: equipoTx1, to: equipoTx2 });
          });
        });
  
        equipos2Tx.forEach((equipoTx2) => {
          equiposROU.forEach((equipoRou) => {
            nodosConexion.push({ from: equipoTx2, to: equipoRou });
          });
        });
      } else {
        // Si Tx2 no existe, conectamos: EquipoDestino -> Tx1 -> ROU
        nodosConexion = equipos1Tx.map((equipoTx) => {
          return { from: cnFrom, to: equipoTx }
        });
        equipos1Tx.forEach((equipoTx1) => {
          equiposROU.forEach((equipoRou) => {
            nodosConexion.push({ from: equipoTx1, to: equipoRou });
          });
        });
      }
    }
    console.log(nodosConexion);
  };
  

  const estructurar = (topologias = []) => {
    console.log(topologias);
    if (topologias.length > 0) {
      equiposDestino.push(topologias[0].EquipoDestino);
      equiposROU.push(topologias[0].EquipoROU);
      equipos1Tx.push(topologias[0].EquipoTx1);
      equipos2Tx.push(topologias[0].EquipoTx2);
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
        if (topologia.EquipoTx2 &&!equipos2Tx.includes(topologia.EquipoTx2)) {
          equipos2Tx.push(topologia.EquipoTx2);
        }
      });
      console.log(equiposDestino, "olt");
      console.log(equiposROU, "rou");
      console.log(equipos1Tx, "tx");
      console.log(equipos2Tx, "tx2");
    }
  }
  
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
      return { key: equipo, img: obtenerImagen(equipo) };
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, img: obtenerImagenBng(equipo) };
    });
    const ObjEquipos1Tx = equipos1Tx.map((equipo) => {
      return { key: equipo || '', img: obtenerImagen1Tx(equipo) };
    });
    const ObjEquipos2Tx = equipos2Tx.map((equipo) => {
      return { key: equipo || '', img: obtenerImagen1Tx(equipo) };
    });
    const nodosTemp = [...ObjEquiposDestino, ...ObjEquiposROU, ...ObjEquipos1Tx, ...ObjEquipos2Tx];
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
        rutaConexion(response.data);
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
      'layout': $(go.TreeLayout, { isInitial: true }),
      'undoManager.isEnabled': true,
    });
  
    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical',
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
