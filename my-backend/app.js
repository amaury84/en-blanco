// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/diagrams', {//coneccion a la base de datos
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir el esquema del nodo
const nodeSchema = new mongoose.Schema({
  key: String,
  color: String
});

const Node = mongoose.model('Node', nodeSchema);

// Definir las rutas
app.get('/nodes', async (req, res) => {
  const nodes = await Node.find();
  res.json(nodes);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
