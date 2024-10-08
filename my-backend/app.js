// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Topologia = require("./models/topologia");
const Usuario = require("./models/usuario");

const app = express();
const port = process.env.PORT || 5000;

///middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://172.31.33.33:27017/Claro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//////////////////////////////////////////CRUD TOPOLOGIAS Y DIAGRAMA//////////////////////////////////////////////
app.get("/topologias", async (req, res) => {
  let { query, tecnologia } = req.query;
  let filter = {};

  if (query) {
    filter.EquipoDestino = query;
    query = new RegExp(query, "i");
  }

  if (tecnologia) {
    tecnologia = new RegExp(tecnologia, "i");
  }

  try {
    const nodes = await Topologia.find({
      EquipoDestino: query,
      Tecnologia: tecnologia,
    });

    res.json(nodes);
  } catch (error) {
    console.error("Error al obtener los nodos:", error);
    res.status(500).json({ error: "Error al obtener los nodos" });
  }
});

app.post("/topologias", async (req, res) => {
  const {
    IpEquipoDestino,
    EquipoDestino,
    UbicacionEquipoDestino,
    TrunkDest,
    Tecnologia,
    TrkRx1,
    EquipoTx1,
    TrkTx1,
    TrkRx2,
    EquipoTx2,
    TrkTx2,
    TrkRx3,
    EquipoTx3,
    TrkTx3,
    TrkRx4,
    EquipoTx4,
    TrkTx4,
    TrkRx5,
    EquipoTx5,
    TrkTx5,
    TrkROU,
    EquipoROU,
    UbicacionEquipoROU,
    IpEquipoROU,
  } = req.body;

  // Validación de campos requeridos
  if (!EquipoDestino || !TrunkDest || !Tecnologia || !EquipoROU) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos requeridos." });
  }

  try {
    const nuevaTopologia = new Topologia({
      IpEquipoDestino,
      EquipoDestino,
      UbicacionEquipoDestino,
      TrunkDest,
      Tecnologia,
      TrkRx1,
      EquipoTx1,
      TrkTx1,
      TrkRx2,
      EquipoTx2,
      TrkTx2,
      TrkRx3,
      EquipoTx3,
      TrkTx3,
      TrkRx4,
      EquipoTx4,
      TrkTx4,
      TrkRx5,
      EquipoTx5,
      TrkTx5,
      TrkROU,
      EquipoROU,
      UbicacionEquipoROU,
      IpEquipoROU,
    });

    await nuevaTopologia.save();
    res.status(201).json({ message: "Topología creada con éxito!" });
  } catch (error) {
    console.error("Error al crear la topología:", error);
    res
      .status(500)
      .json({
        error:
          "Error al crear la topología,Por favor, completa todos los campos requeridos",
      });
  }
});

app.put("/topologias/:id", async (req, res) => {
  const { id } = req.params;
  const {
    IpEquipoDestino,
    EquipoDestino,
    UbicacionEquipoDestino,
    TrunkDest,
    Tecnologia,
    TrkRx1,
    EquipoTx1,
    TrkTx1,
    TrkRx2,
    EquipoTx2,
    TrkTx2,
    TrkRx3,
    EquipoTx3,
    TrkTx3,
    TrkRx4,
    EquipoTx4,
    TrkTx4,
    TrkRx5,
    EquipoTx5,
    TrkTx5,
    TrkROU,
    EquipoROU,
    UbicacionEquipoROU,
    IpEquipoROU,
  } = req.body;

  try {
    const updatedNode = await Topologia.findByIdAndUpdate(
      id,
      {
        IpEquipoDestino,
        EquipoDestino,
        UbicacionEquipoDestino,
        TrunkDest,
        Tecnologia,
        TrkRx1,
        EquipoTx1,
        TrkTx1,
        TrkRx2,
        EquipoTx2,
        TrkTx2,
        TrkRx3,
        EquipoTx3,
        TrkTx3,
        TrkRx4,
        EquipoTx4,
        TrkTx4,
        TrkRx5,
        EquipoTx5,
        TrkTx5,
        TrkROU,
        EquipoROU,
        UbicacionEquipoROU,
        IpEquipoROU,
      },
      { new: true } // Para devolver el documento actualizado
    );

    if (!updatedNode) {
      return res.status(404).json({ error: "Nodo no encontrado" });
    }

    res.json(updatedNode);
  } catch (error) {
    console.error("Error al actualizar el nodo:", error);
    res.status(500).json({ error: "Error al actualizar el nodo" });
  }
});

app.delete("/topologias/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNode = await Topologia.findByIdAndDelete(id);

    if (!deletedNode) {
      return res.status(404).json({ error: "Topología no encontrada" });
    }

    res.json({ message: "Topología eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la topología:", error);
    res.status(500).json({ error: "Error al eliminar la topología" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////USUARIOS///////////////////////////////////////////////////////////

app.post("/usuarios", async (req, res) => {
  const { usser, Password } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    let usuarioEncontrado = await Usuario.findOne({ usser });
    console.log("Encontrado", usuarioEncontrado,Password);

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario incorrecto" });
    }

    const esValida = await bcrypt.compare(Password, usuarioEncontrado.Password);

    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrectos" });
    }

    res.status(200).json({ mensaje: "Usuario OK" });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`EL servicio se esta ejecutando sobre el puerto: ${port}`);
});
