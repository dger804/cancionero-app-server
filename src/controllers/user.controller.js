const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const User = require('../models/user.model');
const { create } = require('../models/user.model');

module.exports = {
  async create(req,res){
    try{      
      const { apodo, password, nombre, email, carpetas, canciones, imgperfil, tipo } = req.body;
      if(password.length < 4 || password.length > 8){
        throw new Error('Su contraseña debe ser entre 4 y 8 dígitos')
      }
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ apodo, password: encPassword, nombre, email, carpetas, canciones, imgperfil, tipo });
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
}
