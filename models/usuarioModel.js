const pool = require('../configs/database');

async function createUsuario({ usuario, senha }) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
    [usuario, senha]
  );
  return getUsuarioById(result.insertId);
}

async function getUsuarioByUsuario(usuario) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
}

async function getUsuarioById(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

async function updateToken(id, token) {
  await pool.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, id]);
}

module.exports = {
  createUsuario,
  getUsuarioByUsuario,
  getUsuarioById,
  updateToken
};
