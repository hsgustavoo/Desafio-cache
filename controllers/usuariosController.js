const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const usuarioModel = require('../models/usuarioModel');

async function criarUsuario(req, res, next) {
  try {
    const { usuario, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = await usuarioModel.createUsuario({ usuario, senha: hash });
    res.status(201).json(novoUsuario);
  } catch (error) {
    next(createError(500, 'Erro ao criar usuário'));
  }
}

async function login(req, res, next) {
  try {
    const { usuario, senha } = req.body;
    const usuarioDB = await usuarioModel.getUsuarioByUsuario(usuario);

    if (!usuarioDB || !(await bcrypt.compare(senha, usuarioDB.senha))) {
      return next(createError(401, 'Credenciais inválidas'));
    }

    const token = jwt.sign({ id: usuarioDB.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await usuarioModel.updateToken(usuarioDB.id, token);
    res.json({ token });
  } catch (error) {
    next(createError(500, 'Erro ao fazer login'));
  }
}

async function logout(req, res, next) {
  try {
    const userId = req.user.id;
    await usuarioModel.updateToken(userId, null);
    res.json({ message: 'Logout efetuado com sucesso' });
  } catch (error) {
    next(createError(500, 'Erro ao fazer logout'));
  }
}

async function listarUsuarios(req, res, next) {
  try {
    const usuario = await usuarioModel.getUsuarioById(req.user.id);
    res.json(usuario);
  } catch (error) {
    next(createError(500, 'Erro ao buscar usuário'));
  }
}

module.exports = {
  criarUsuario,
  login,
  logout,
  listarUsuarios
};
