const mongoose = require ('mongoose');

function connect(){
  const mongoURI = process.env.mongoURI
  mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.connection.once('open', () =>
    console.log('Conectado con la base de datos de Cancionero-App')
  );

  mongoose.connection.on('error', (err) =>
    console.log('Algo va mal... ')
  );
}
module.exports = { connect }
