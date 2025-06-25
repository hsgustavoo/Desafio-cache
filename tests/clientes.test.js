const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Testes da API /clientes', () => {
  let token = '';

  beforeAll(async () => {
    await request(app).post('/usuarios').send({
      usuario: 'testejest',
      senha: '123456'
    });

    const res = await request(app).post('/usuarios/login').send({
      usuario: 'testejest',
      senha: '123456'
    });

    token = res.body.token;
  });

  it('Deve criar um cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Teste',
        sobrenome: 'Automatizado',
        email: 'teste@auto.com',
        idade: 30
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve negar acesso sem token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(401);
  });

  it('Deve listar clientes com token', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
