const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next(createError(401, 'Token não fornecido'));

  const token = authHeader.split(' ')[1];
  if (!token) return next(createError(401, 'Token inválido'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(403, 'Token expirado ou inválido'));
  }
}

module.exports = autenticar;
