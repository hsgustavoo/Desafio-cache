const createError = require('http-errors');
const clienteService = require('../services/clienteService');
const clienteModel = require('../models/clienteModel');

async function listarClientes(req, res, next) {
  try {
    const clientes = await clienteService.getClientes();
    res.json(clientes);
  } catch (error) {
    next(createError(500, 'Erro ao buscar clientes'));
  }
}

async function buscarCliente(req, res, next) {
  try {
    const cliente = await clienteModel.getClienteById(req.params.id);
    if (!cliente) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    res.json(cliente);
  } catch (error) {
    next(createError(500, 'Erro ao buscar cliente'));
  }
}

async function criarCliente(req, res, next) {
  try {
    const novoCliente = await clienteModel.createCliente(req.body);
    await clienteService.invalidateClientesCache();
    res.status(201).json(novoCliente);
  } catch (error) {
    next(createError(500, 'Erro ao criar cliente'));
  }
}

async function atualizarCliente(req, res, next) {
  try {
    const clienteAtualizado = await clienteModel.updateCliente(req.params.id, req.body);
    await clienteService.invalidateClientesCache();
    res.json(clienteAtualizado);
  } catch (error) {
    next(createError(500, 'Erro ao atualizar cliente'));
  }
}

async function deletarCliente(req, res, next) {
  try {
    await clienteModel.deleteCliente(req.params.id);
    await clienteService.invalidateClientesCache();
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Erro ao deletar cliente'));
  }
}

module.exports = {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  deletarCliente
};