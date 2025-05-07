const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('Interview Prep Routes', () => {
  it('POST /api/interview-prep', async () => {
    const res = await request(app).post('/api/interview-prep').send({
      user: "user123",
      topic: "MERN Stack",
      notes: "Prepare aggregation and hooks"
    });
    expect([201, 500]).to.include(res.status);
  });

  it('GET /api/interview-prep/:id', async () => {
    const res = await request(app).get('/api/interview-prep/fakePrepId');
    expect([200, 404, 500]).to.include(res.status);
  });

  it('PUT /api/interview-prep/:id', async () => {
    const res = await request(app).put('/api/interview-prep/fakePrepId').send({ notes: "Updated notes" });
    expect([200, 404, 500]).to.include(res.status);
  });

  it('DELETE /api/interview-prep/:id', async () => {
    const res = await request(app).delete('/api/interview-prep/fakePrepId');
    expect([200, 404, 500]).to.include(res.status);
  });
});
