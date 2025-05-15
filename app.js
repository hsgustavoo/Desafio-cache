require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const requestLogger = require('./middlewares/logging');
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API ativa' });
});

app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);

// Tratamento de erros
app.use((req, res, next) => {
  next(createError(404, 'Endpoint não encontrado'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});