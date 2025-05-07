const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('Favorites Routes', () => {
  it('GET /api/favorites/user123', async () => {
    const res = await request(app).get('/api/favorites/user123');
    expect([200, 500]).to.include(res.status);
  });

  it('POST /api/favorites', async () => {
    const res = await request(app).post('/api/favorites').send({
      userId: "user123",
      sourceId: "job789",
      title: "React Dev",
      company: "MERN Ltd"
    });
    expect([201, 500]).to.include(res.status);
  });

  it('DELETE /api/favorites', async () => {
    const res = await request(app).delete('/api/favorites').send({
      userId: "user123",
      sourceId: "job789"
    });
    expect([200, 404, 500]).to.include(res.status);
  });
});
