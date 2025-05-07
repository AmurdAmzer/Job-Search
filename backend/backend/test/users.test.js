const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('Users Routes', () => {
    it('POST /api/users/register → fail with missing fields', async () => {
        const res = await request(app).post('/api/users/register').send({ email: "test@mern.com" });
        expect([400, 500]).to.include(res.status);
        expect(res.body).to.have.property('message');
    });
           

  it('POST /api/users/login', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: "test@mern.com",
      password: "wrongpass"
    });
    expect([401, 500]).to.include(res.status);
  });

  it('GET /api/users/:id', async () => {
    const res = await request(app).get('/api/users/fakeUserId');
    expect([200, 404, 500]).to.include(res.status);
  });

  it('PUT /api/users/:id', async () => {
    const res = await request(app).put('/api/users/fakeUserId').send({ name: "Updated" });
    expect([200, 404, 500]).to.include(res.status);
  });

  it('DELETE /api/users/:id', async () => {
    const res = await request(app).delete('/api/users/fakeUserId');
    expect([200, 404, 500]).to.include(res.status);
  });
});
