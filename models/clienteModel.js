const pool = require('../configs/database');

async function getAllClientes() {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
}

async function getClienteById(id) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
}

async function createCliente(cliente) {
  const { nome, sobrenome, email, idade } = cliente;
  const [result] = await pool.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  return getClienteById(result.insertId);
}

async function updateCliente(id, cliente) {
  const { nome, sobrenome, email, idade } = cliente;
  await pool.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  return getClienteById(id);
}

async function deleteCliente(id) {
  await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};