// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Topologia = require('./models/topologia');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://172.31.33.33:27017/Claro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.get('/topologias', async (req, res) => {
  let { query, tecnologia } = req.query;
  let filter = {};
  
  if (query) {
    query = new RegExp(query, 'i');
  }
  
  if (tecnologia) {
    tecnologia = new RegExp(tecnologia, 'i');
  }
  
  try {
    const nodes = await Topologia.find({ EquipoDestino: query, Tecnologia: tecnologia });
    
    res.json(nodes);
  } catch (error) {
    console.error('Error al obtener los nodos:', error);
    res.status(500).json({ error: 'Error al obtener los nodos' });
  }
});

app.post('/topologias', async (req, res) => {
  const { IpEquipoDestino, EquipoDestino, UbicacionEquipoDestino, TrunkDest, Tecnologia, TrkROU, EquipoROU, UbicacionEquipoROU, IpEquipoROU } = req.body;

  try {
    const nuevaTopologia = new Topologia({
      IpEquipoDestino,
      EquipoDestino,
      UbicacionEquipoDestino,
      TrunkDest,
      Tecnologia,
      TrkROU,
      EquipoROU,
      UbicacionEquipoROU,
      IpEquipoROU
    });

    await nuevaTopologia.save();
    res.status(201).json({ message: "Topología creada con éxito!" });
  } catch (error) {
    console.error('Error al crear la topología:', error);
    res.status(500).json({ error: 'Error al crear la topología' });
  }
});



app.listen(port, () => {
  console.log(`EL servicio se esta ejecutando sobre el puerto: ${port}`);
});
