const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.listarClientes);
router.get('/:id', clientesController.buscarCliente);
router.post('/', clientesController.criarCliente);
router.put('/:id', clientesController.atualizarCliente);
router.delete('/:id', clientesController.deletarCliente);

module.exports = router;