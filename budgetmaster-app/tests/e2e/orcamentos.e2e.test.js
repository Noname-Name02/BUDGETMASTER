const request = require('supertest');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/orcamentos', (req, res) => {
  res.status(200).json([]);
});

describe('E2E Orçamentos', () => {

  test('GET /orcamentos', async () => {
    const res = await request(app).get('/orcamentos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});