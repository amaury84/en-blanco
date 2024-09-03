// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Topologia = require("./models/topologia");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Claro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.get("/topologias", async (req, res) => {
  let { query, tecnologia } = req.query;
  let filter = {};

  if (query) {
    query = new RegExp(query, "i");
  }

  if (tecnologia) {
    tecnologia = new RegExp(tecnologia, "i");
  }

  try {
    const nodes = await Topologia.find({EquipoDestino: query,Tecnologia: tecnologia,});

    res.json(nodes);
  } catch (error) {
    console.error("Error al obtener los nodos:", error);
    res.status(500).json({ error: "Error al obtener los nodos" });
  }
});

app.post("/topologias", async (req, res) => {
  const { EquipoDestino } = req.body;

  try {
    const newTopologia = new TopologiaModel({ EquipoDestino });
    await newTopologia.save();
    res.status(201).json(newTopologia);
  } catch (error) {
    console.error("Error al crear la topología:", error);
    res.status(500).json({ error: "Error al crear la topología" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
