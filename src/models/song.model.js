const { model, Schema, models } = require('mongoose');

const songSchema = new Schema({
  Folderid:{
    type: String,
    default: ''
  },
  titulo: {
    type: String,
    required: true
  },
  artista: {
    type: String,
    default: ''
  },
  tono: {
    type: String,
    default: ''
  },
  letra: {
    type: String,
    default: ''
  },
})
const Song = model('Song', songSchema)
module.exports = Song