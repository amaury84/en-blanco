document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el contenedor para la visualización de la red
    var container = document.getElementById('network');
    // Configura opciones para la red
    var options = {
        
        nodes: {
       shape: 'dot', // Forma de los nodos
        size: 50, // Tamaño de los nodos
        color: {
            border: 'black', // Color del borde del nodo
            background: 'white' // Color de fondo del nodo
        },
        font: {
            size: 19, // Tamaño del texto dentro del nodo
            color: 'black' // Color del texto dentro del nodo
        }
        
    },
    
    edges: {
        color: 'gray', // Color de las aristas
        width: 5, // Ancho de las aristas
       
    },

    physics: {
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -70000, // Fuerza de atracción entre nodos
                centralGravity: 0.2, // Atrae los nodos hacia el centro
                springLength: 250, // Longitud del resorte
                springConstant: 0.1 // Constante del resorte para ajustar la fuerza de 
            },
            
        },
        
    };
    
    // Crea una instancia de la red con datos vacíos iniciales
    var network = new vis.Network(container, { nodes: [], edges: [] }, options);

    // Función para cargar datos desde el archivo JSON
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            console.log("Datos cargados:", data); 

            var nodes = [];
            var nodeIds = {};
            var nodeIdCounter = 1;

            // Genera nodos únicos
            data.forEach(item => {
                if (!nodeIds[item.SALIDA]) {
                    nodeIds[item.SALIDA] = nodeIdCounter++;
                    nodes.push({
                        id: nodeIds[item.SALIDA],
                        label: item.SALIDA
                    });
                }
                if (!nodeIds[item["FIN-UNA"]]) {
                    nodeIds[item["FIN-UNA"]] = nodeIdCounter++;
                    nodes.push({
                        id: nodeIds[item["FIN-UNA"]],
                        label: item["FIN-UNA"]
                    });
                }           
            });

            var edges = [];
            data.forEach(item => {
                var aUno = {};
                nodes.forEach(node => {
                    aUno[node.label] = node.id;
                });

                var fromNode = aUno[item.SALIDA];
                var toNode = aUno[item["FIN-UNA"]];
                var salPort = item["PUERTO-1-SAL"];
                var llegPort = item["PUERTO-1-LLEG"];
                var path = `${salPort} → ${llegPort}`;

                edges.push({
                    from: fromNode,
                    to: toNode,
                    label: path,
                    font: { align: "top", color: 'white',size: 20, strokeColor: 'black'  }
                });
                console.log("ojooo", toNode);
            });

            console.log("Enlaces:", edges);

            // Define los datos para la red
            var networkData = {
                nodes: nodes,
                edges: edges
            };

            // Actualiza la red con los nuevos datos
            network.setData(networkData);
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // Función para ajustar el tamaño del contenedor
    function resize() {
        $("#contents").height($("body").height() - $("#header").height() - 30);
    }

    // Función para restablecer la red a un estado inicial
    function reset() {
        $("#data").val(dotDefault);
        draw();
    }

    // Función para dibujar la red (opcional, si estás usando DOT)
    function draw() {
        try {
            resize();
            $("#error").html("");

            // Obtener datos del área de texto y parsear a formato de red
            const dotString = $("#data").val();
            const data = vis.parseDOTNetwork(dotString);

            // Actualizar la red con los nuevos datos
            network.setData(data);
        } catch (err) {
            // Manejo de errores
            const match = /\(char (.*)\)/.exec(err);
            if (match) {
                const pos = Number(match[1]);
                const textarea = $("#data")[0];
                if (textarea.setSelectionRange) {
                    textarea.focus();
                    textarea.setSelectionRange(pos, pos);
                }
            }

            // Mostrar mensaje de error
            $("#error").html(err.toString());
        }
    }

    // Configuración predeterminada del DOT (opcional)
    const dotDefault = `
    digraph {
      // Parent nodes
      lines[label="LINES"]; 
      ahs[label="ARROW HEADS"]; 

      // Children nodes
      dot[label="both dot"]; 
      vee[label="back vee"]; 
      diamond[label="diamond and box"]; 

      // Line styles
      lines -- solid[label="solid pink", color="pink"]; 
      lines -- penwidth[label="penwidth=5", penwidth=5]; 
      lines -- dashed[label="dashed green", style="dashed", color="green"]; 
      lines -- dotted[label="dotted purple", style="dotted", color="purple"]; 

      // Arrowhead styles
      ahs -> box[label="box", arrowhead=box]; 
      ahs -> crow[label="crow", arrowhead=crow]; 
      ahs -> curve[label="curve", arrowhead=curve]; 
      ahs -> icurve[label="icurve", arrowhead=icurve]; 
      ahs -> normal[label="normal", arrowhead=normal]; 
      ahs -> inv[label="inv", arrowhead=inv]; 
      ahs -> diamond[label="diamond and box", dir=both, arrowhead=diamond, arrowtail=box]; 
      ahs -> dot[label="both dot", dir=both, arrowhead=dot, arrowtail=dot]; 
      ahs -> tee[label="tee", arrowhead=tee]; 
      ahs -> vee[label="back vee", dir=back, arrowtail=vee]; 
    }
    `;
    
});
