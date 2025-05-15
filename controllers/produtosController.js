const createError = require('http-errors');
const produtoService = require('../services/produtoService');
const produtoModel = require('../models/produtoModel');

async function listarProdutos(req, res, next) {
  try {
    const produtos = await produtoService.getProdutos();
    res.json(produtos);
  } catch (error) {
    next(createError(500, 'Erro ao buscar produtos'));
  }
}

async function buscarProduto(req, res, next) {
  try {
    const produto = await produtoModel.getProdutoById(req.params.id);
    if (!produto) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json(produto);
  } catch (error) {
    next(createError(500, 'Erro ao buscar produto'));
  }
}

async function criarProduto(req, res, next) {
  try {
    const novoProduto = await produtoModel.createProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    next(createError(500, 'Erro ao criar produto'));
  }
}

async function atualizarProduto(req, res, next) {
  try {
    const produtoAtualizado = await produtoModel.updateProduto(req.params.id, req.body);
    res.json(produtoAtualizado);
  } catch (error) {
    next(createError(500, 'Erro ao atualizar produto'));
  }
}

async function deletarProduto(req, res, next) {
  try {
    await produtoModel.deleteProduto(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Erro ao deletar produto'));
  }
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
};