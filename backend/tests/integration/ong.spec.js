const request = require('supertest');
const app = require('../../src/app');
const connection  = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async ()  => {
    await connection.destroy();
  })

  it('should e able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Panacea ONG 2",
        email: "contato@panacea.com.br",
        whatsapp: "46999789430",
        city: "Pato Branco",
        uf: "PR"
      });
    console.log(response.body);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});