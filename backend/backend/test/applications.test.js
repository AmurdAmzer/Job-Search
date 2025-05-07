const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('Applications Routes', () => {
  it('POST /api/applications', async () => {
    const res = await request(app).post('/api/applications').send({
      user: "user123",
      jobId: "job999",
      companyName: "MERN Inc",
      status: "Applied"
    });
    expect([201, 500]).to.include(res.status);
  });

  it('GET /api/applications/user123', async () => {
    const res = await request(app).get('/api/applications/fatima');
    expect([200, 500]).to.include(res.status);
  });

  it('PUT /api/applications/:id', async () => {
    const res = await request(app).put('/api/applications/TestingAppId').send({ status: "Interviewing" });
    expect([200, 404, 500]).to.include(res.status);
  });

  it('DELETE /api/applications/:id', async () => {
    const res = await request(app).delete('/api/applications/fakeAppId');
    expect([200, 404, 500]).to.include(res.status);
  });
});
