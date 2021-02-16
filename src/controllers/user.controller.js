const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async create(req,res){
    try{      
      const { apodo, password, nombre, email, carpetas, imgperfil, tipo } = req.body;
      if(password.length < 4 || password.length > 8){
        throw new Error('Su contraseña debe ser entre 4 y 8 dígitos')
      }
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ apodo, password: encPassword, nombre, email, carpetas, imgperfil, tipo });
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24},
      );
      res.status(201).json({ token })
    }catch(err){
      res.status(400).json({ message: err.message })
    }
  },
  async list(req, res){
    try{
      const user = await User.find().select('-password');
      res.status(200).json({ message: 'Usuarios encontrados', data: user });
    }catch(err){
      res.status(404).json({ message: err.message });
    }
  },
  async show(req, res){
    try{
      const id = req.userId;
      const user = await User.findById(id).select('-password');
      if(!user){
        throw new Error('Usuario no encontrado');
      }
      res.status(200).json({ message: 'Usuario encontrado', data: user });
    }catch(err){
      res.status(404).json({ message: err.message });
    }
  },
  async login(req, res){
    try{
      const { email, password }= req.body;
      const user = await User.findOne({ email });
      if(!user){
        throw new error( 'Email o contraseña errados');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if(!isValid){
        throw new error('Email o contraseña errados');
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24}
      )
      res.status(200).json({ token });
    }catch(err){
      res.status(400).json({ message: err.message });
    }
  }
}
