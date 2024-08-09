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
  const equipos2Tx = [];
  let nodosConexion = [];
  let objRutaConexion = [];

  const rutaConexion = (topologias = []) => {
    if (topologias.length === 0) {
      return;
    }

    topologias.forEach(({EquipoDestino, EquipoROU, TrunkDest, TrkROU, EquipoTx1}) => {
      if (EquipoTx1) {
        console.log("equipo", EquipoTx1)
        // logica de los nodos.
         
      } else {
        console.log("No hay equipo tx1", EquipoTx1)
        const ruta = {
          inicial: EquipoDestino,
          node: { from: EquipoDestino, to: EquipoROU },
          final: EquipoROU,
          puerto1: TrunkDest,
          puerto2: TrkROU 
        }
        objRutaConexion.push(ruta);
      }
    });

  }

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
        if (!equipos1Tx.includes(topologia.EquipoTx1)) {
          equipos1Tx.push(topologia.EquipoTx1);
        }
      });
      console.log(equiposDestino);
      console.log(equiposROU);
      console.log(equipos1Tx);
    }
  }

///////////////////////////////////////////////////////ultima parte para edicion

  const obtenerImagen = (equipo) => {
    if (equipo.includes('ZAC') || equipo.includes('HAC') || equipo.includes('NAC')) {
      return '/imagenes/OLT.png';
    } else {
      return '/imagenes/cmts.png';
    }
  };
  const obtenerImagen1Tx = (equipo) => {
    if (equipo.includes('CAJA') || equipo.includes('ODF')|| equipo.includes('FOL')) {
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
    } else{
      return '/imagenes/receptor.png';
    }
  };
//////////////continue desde aqui.///////////////////////////////////////


  const actualizarGrafica = () => {
    const ObjEquiposDestino = [...equiposDestino].map((equipo) => {
      return { key: equipo, img: obtenerImagen(equipo) }
    });
    const ObjEquiposROU = equiposROU.map((equipo) => {
      return { key: equipo, img: obtenerImagenBng(equipo) }
    });
    const ObjEquipos1Tx = equipos1Tx.map((equipo) => {
      return { key: equipo, img: obtenerImagen1Tx(equipo) }
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
        rutaConexion(response.data);
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

    //tipo de diagrama
    const myDiagram = $(go.Diagram, diagramRef.current, {
      allowDelete: false,
      allowCopy: false,
      'layout': $(go.TreeLayout, { isInitial: true }),
      'undoManager.isEnabled': true,
    });

    //estilo de nodos y texto
    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical', // Cambio aquí para poner la imagen y el texto en vertical
      {
        row: 1,
        column: 1,
        name: 'BODY',
        stretch: go.Stretch.Fill,
      },
      $(
        go.Picture,
        { margin: 8, width: 50, height: 50 },
        new go.Binding('source', 'img')
      ),
      $(
        go.TextBlock,
        { margin: 8, textAlign: 'center', font: '14px ARIAL', stroke: 'white' }, // Cambia el color del texto a blanco
        new go.Binding('text', 'key')
      )
    );
    myDiagram.linkTemplate = $(go.Link, // the whole link panel
      {
        selectionAdorned: true,
        layerName: 'Background',
        reshapable: true,
        routing: go.Routing.AvoidsNodes,
        corner: 5,
      },
      $(go.Shape, // the link shape
        { stroke: '#ffffff', strokeWidth: 2 }
      ),
      $(go.TextBlock, // the "from" label
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
      $(go.TextBlock, // the "to" label
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
  ></div>
};

export default DiagramComponent;
