const pool = require('../configs/database');

async function getAllProdutos() {
  const [rows] = await pool.query('SELECT * FROM produtos');
  return rows;
}

async function getProdutoById(id) {
  const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
}

async function createProduto(produto) {
  const { nome, descricao, preco } = produto;
  const [result] = await pool.query(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
    [nome, descricao, preco]
  );
  return getProdutoById(result.insertId);
}

async function updateProduto(id, produto) {
  const { nome, descricao, preco } = produto;
  await pool.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
    [nome, descricao, preco, id]
  );
  return getProdutoById(id);
}

async function deleteProduto(id) {
  await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};