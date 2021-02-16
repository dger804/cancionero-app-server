const User = require('../models/user.model');
const Folder = require('../models/folder.model');
const Song = require('../models/song.model');

module.exports = {
  async list(req, res){
    try{
      const song = await Song.find().populate(
        'userId, folderId'
      ).catch(err => { res.status(500).json(err) })
    }catch(err){
      res.status(400).json({ message: err.message });
    }
  },
  async create(req, res){
    try{
      const userId = req.userId;
      const user = await User.findById( userId );      
      const { Folderid, titulo, artista, tono, letra } = req.body;
      const song = await Song.create(
        { 
          Folderid: user.carpetas,
          titulo,
          artista,
          tono,
          letra,
        }
      ); 
    }catch(err){
      res.status(400).json({ message: err.message })
    }
  }
}