const { model, Schema, models } = require('mongoose');

const songSchema = new Schema({
  carpetaid:{ 
    type: [{ type: Schema.Types.ObjectId,
      ref: 'Folder'
    }],
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
}, {
  timestamps: true
})
const Song = model('Song', songSchema)
module.exports = Song