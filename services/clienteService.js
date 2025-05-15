const cache = require('../configs/cache');
const clienteModel = require('../models/clienteModel');
const chalk = require('chalk');

async function getClientes() {
  const cacheKey = 'allClientes';
  let clientes = cache.get(cacheKey);
  
  if (clientes) {
    console.log(chalk.green('[CACHE] Retornando clientes do cache'));
    return clientes;
  }
  
  console.log(chalk.yellow('[DB] Buscando clientes no banco de dados'));
  clientes = await clienteModel.getAllClientes();
  cache.set(cacheKey, clientes);
  return clientes;
}

async function invalidateClientesCache() {
  cache.del('allClientes');
  console.log(chalk.red('[CACHE] Cache de clientes invalidado'));
}

module.exports = {
  getClientes,
  invalidateClientesCache
};