const moongose = require('moongose');




const TopologiaSchema = new moongose.Schema({
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    },
    EquipoDestino:
    {
        type: String,
        required: true
    },
    TrunkDest:
    {
        type: String,
        required: true
    }
})

const Topologia = moongose.model('Topologia', TopologiaSchema);
module.exports = Topologia;