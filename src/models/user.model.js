const { model, Schema, models } = require('mongoose');

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const userSchema = new Schema({
  apodo: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    match: [emailRegexp, 'Email inválido'],
    validate: [
      {
        validator(value){
          return models.User.findOne({ email: value })
            .then(user => !user )
            .catch(() => false )
        },
        message: "Ya existe el email"
      }
    ]
  },
  carpetas: {
    type: [{ type: Schema.Types.ObjectId,
      ref: 'Folder'
    }],
  },
  imgperfil: {
    type: String,
    default: ''
  },
  tipo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})
const User = model('User', userSchema)
module.exports = User