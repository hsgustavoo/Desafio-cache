const produtoModel = require('../models/produtoModel');
const chalk = require('chalk');

async function getProdutos() {
  console.log(chalk.yellow('[DB] Buscando produtos no banco de dados'));
  return await produtoModel.getAllProdutos();
}

module.exports = {
  getProdutos
};