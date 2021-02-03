const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try{
    const { authorization } = req.headers;
    if(!authorization){
      throw new Error('Sesión expirada')
    }
    const [_,token] = authorization.split(' ');
    if(!token){
      throw new Error('Sesión expirada');
    }
    const { id } = jwt.verify(token, process.env.SECRET);
    req.userId = id;
    next();
  } catch (err){
    res.status(401).json({ message: err.message });
  }
}