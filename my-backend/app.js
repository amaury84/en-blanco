// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/diagrams', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const nodeSchema = new mongoose.Schema({
  key: String,
  color: String
});

const Node = mongoose.model('Node', nodeSchema);

app.get('/nodes', async (req, res) => {
  const { query } = req.query;
  let nodes;
  if (query) {
    nodes = await Node.find({ key: new RegExp(query, 'i') }, 'key color _id'); // Filtra por la clave usando una expresión regular
  } else {
    nodes = await Node.find({}, 'key color _id'); // Devuelve todos los nodos si no hay consulta
  }
  res.json(nodes);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
