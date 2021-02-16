const User = require('../models/user.model');
const Folder = require('../models/folder.model');

module.exports = {
  async list(req, res){
    try{
      const folders = await Folder.find().populate(
        'userId' 
      ).catch(err => { res.status(500).json(err) })
    }catch(err){
      res.status(400).json({ message: err.message })
    }
  },
  async create(req, res){
    try{
      const userId = req.userId
      const { id, titulo } = req.body;
      const user = await User.findById( userId );
      if(!user){
        throw new Error('Usuario inválido')
      }
      const folder = await Folder.create(
        { 
          Userid: userId, 
          titulo
        }
      )
      res.status(201).json({ message: 'Carpeta creada', data: folder })
    }catch(err){
      res.status(400).json({ message: err.message })
    }
  },
}