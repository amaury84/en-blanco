///Modulo para crear una nueva topologia en el sistema

const mongoose = require("mongoose");

const topologiaSchema = new mongoose.Schema(
  {
    IpEquipoDestino: { type: String, required: false },
    EquipoDestino: { type: String, required: true },
    UbicacionEquipoDestino: { type: String, required: false },
    TrunkDest: { type: String, required: true },
    Tecnologia: { type: String, required: true },
    TrkRx1: { type: String, required: false },
    EquipoTx1: { type: String, required: false },
    TrkTx1: { type: String, required: false },
    TrkRx2: { type: String, required: false },
    EquipoTx2: { type: String, required: false },
    TrkTx2: { type: String, required: false },
    TrkRx3: { type: String, required: false },
    EquipoTx3: { type: String, required: false },
    TrkTx3: { type: String, required: false },
    TrkRx4: { type: String, required: false },
    EquipoTx4: { type: String, required: false },
    TrkTx4: { type: String, required: false },
    TrkRx5: { type: String, required: false },
    EquipoTx5: { type: String, required: false },
    TrkTx5: { type: String, required: false },
    TrkROU: { type: String, required: false },
    EquipoROU: { type: String, required: true },
    UbicacionEquipoROU: { type: String, required: false },
    IpEquipoROU: { type: String, required: false },
  },
  { timestamps: true }
);
// Método para convertir el documento a JSON
topologiaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Topologia = mongoose.model("Topologia", topologiaSchema);
module.exports = Topologia;
