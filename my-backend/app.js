// app.js
const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Topologia = require('./models/topologia');
const Usuario = require('./models/usuario');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://172.31.33.33:27017/Claro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//////////////////////////////////////////CRUD TOPOLOGIAS Y DIAGRAMA//////////////////////////////////////////////
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
  const { 
    IpEquipoDestino, EquipoDestino, UbicacionEquipoDestino, TrunkDest, Tecnologia, 
    TrkRx1, EquipoTx1, TrkTx1, TrkRx2, EquipoTx2, TrkTx2, 
    TrkRx3, EquipoTx3, TrkTx3, TrkRx4, EquipoTx4, TrkTx4, 
    TrkRx5, EquipoTx5, TrkTx5, TrkROU, EquipoROU, UbicacionEquipoROU, IpEquipoROU 
  } = req.body;

  // Validación de campos requeridos
  if (!EquipoDestino || !TrunkDest || !Tecnologia || !EquipoROU) {
    return res.status(400).json({ error: "Por favor, completa todos los campos requeridos." });
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
      IpEquipoROU
    });

    await nuevaTopologia.save();
    res.status(201).json({ message: "Topología creada con éxito!" });
  } catch (error) {
    console.error('Error al crear la topología:', error);
    res.status(500).json({ error: 'Error al crear la topología,Por favor, completa todos los campos requeridos' });
  }
});

app.put('/topologias/:id', async (req, res) => {
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
    IpEquipoROU
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
        IpEquipoROU
      },
      { new: true } // Para devolver el documento actualizado
    );
    
    if (!updatedNode) {
      return res.status(404).json({ error: 'Nodo no encontrado' });
    }
    
    res.json(updatedNode);
  } catch (error) {
  console.error('Error al actualizar el nodo:', error);
  res.status(500).json({ error: 'Error al actualizar el nodo' });
}
});

app.delete('/topologias/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedNode = await Topologia.findByIdAndDelete(id);
    
    if (!deletedNode) {
      return res.status(404).json({ error: 'Topología no encontrada' });
    }
    
    res.json({ message: 'Topología eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la topología:', error);
    res.status(500).json({ error: 'Error al eliminar la topología' });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////CRUD USUARIOS///////////////////////////////////////////////////////////
// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Usuario.findOne({ email });
    if (user) return res.status(400).json({ error: 'El usuario ya existe' });

    user = new Usuario({ email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });  // Usa una clave secreta segura
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Middleware para verificar el token
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  
  try {
    const decoded = jwt.verify(token, 'secretkey');  // Asegúrate de usar la misma clave secreta
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' });
  }
}

// Ejemplo de una ruta protegida
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso concedido a ruta protegida', user: req.user });
});



app.listen(port, () => {
  console.log(`EL servicio se esta ejecutando sobre el puerto: ${port}`);
});
