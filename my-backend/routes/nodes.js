// routes/nodes.js
const express = require('express');
const router = express.Router();
const Node = require('../models/node');

// Obtener todos los nodos
router.get('/', async (req, res) => {
  const nodes = await Node.find();
  res.json(nodes);
});

// Crear un nuevo nodo
router.post('/', async (req, res) => {
  const newNode = new Node(req.body);
  await newNode.save();
  res.json(newNode);
});

module.exports = router;
