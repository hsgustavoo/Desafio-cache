const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const autenticar = require('../middlewares/auth');

router.post('/', usuariosController.criarUsuario);
router.post('/login', usuariosController.login);
router.post('/logout', autenticar, usuariosController.logout);
router.get('/', autenticar, usuariosController.listarUsuarios);

module.exports = router;
