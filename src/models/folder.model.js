const { model, Schema, models } = require('mongoose');

const folderSchema = new Schema ({
  Userid: {
    type: [{ type: Schema.Types.ObjectId,
      ref: 'User'
      }],
  },
  titulo: {
    type: String,
    required: true
  },
  canciones: {
    type: [{ type: Schema.Types.ObjectId,
    ref: 'Song'
    }],
  }
}, {
  timestamps: true
})
const Folder = model('Folder', folderSchema)
module.exports = Folder