const { Schema, model } = require("mongoose");


const TopologiaSchema = Schema({

    EquipoDestino: {
        type: String,
    },
    TrunkDest: {
        type: String,
    },
    TrkROU: {
        type: String,
    },
    EquipoROU: {
        type: String,
    },
    TrkRx1: {
        type: String,
    },
    EquipoTx1: {
        type: String,
    },
    TrkTx1: {
        type: String,
    },
    Tecnologia: {
        type: String,
    },
    IP: {
        type: String,
    },

}, { timestamps: true });

TopologiaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Topologia', TopologiaSchema);