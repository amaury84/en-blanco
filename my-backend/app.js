
// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Topologia = require('./models/topologia');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Claro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/topologias', async (req, res) => {
  const { query } = req.query;
  let nodes;
  const regex = new RegExp(query, 'i');
  console.log({query})
  if (query) {
    nodes = await Topologia
    .find({ EquipoDestino: new RegExp(query, 'i')}); // Filtra por la clave usando una expresión regular
    // .find({$or: [{ EquipoROU: regex }, { EquipoDestino: regex }] }), 
  } else {
    node = {data: []};
    // nodes = await Topologia.find(); // Devuelve todos los nodos si no hay consulta
  }
  res.json(nodes);
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
