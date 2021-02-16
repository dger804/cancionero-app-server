const Folder = require('../models/folder.model');
const Song = require('../models/song.model');

module.exports = {
  async create(req, res){
    try{
      const folderId = req.body;  
      const id = folderId.carpetaid;
      const folder = await Folder.findById( id );
      if(!folder){
        throw new Error('Carpeta inválida')
      }    
      const { carpetaid, titulo, artista, tono, letra } = req.body;
      const song = await Song.create(
        { 
          carpetaid: id,
          titulo,
          artista,
          tono,
          letra,
        }
      ); 
      folder.canciones.unshift( song );
      await folder.save({ validateBeforeSave: false });
      res.status(201).json({ message: 'Canción creada', data: song });
    }catch(err){
      res.status(400).json({ message: err.message })
    }
  },
  async list(req, res){
    try{
      const songs = await Song.find().catch(
        err => { res.status(500).json(err) }
      )
      res.status(200).json({ message: "Canciones encontradas", data: songs })
    }catch(err){
      res.status(400).json({ message: err.message });
    }
  },
}