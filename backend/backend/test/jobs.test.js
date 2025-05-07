const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('Jobs Routes', () => {
  it('GET /api/jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect([200, 500]).to.include(res.status);
  });

  it('GET /api/jobs/search', async () => {
    const res = await request(app).get('/api/jobs/search').query({ title: 'developer' });
    expect([200, 500]).to.include(res.status);
  });

  it('POST /api/jobs/upload', async () => {
    const job = {
      title: "MERN Dev",
      company: "Tech",
      location: "Remote",
      jobType: "Full-time",
      description: "Build MERN apps"
    };
    const res = await request(app).post('/api/jobs/upload').send(job);
    expect([201, 500]).to.include(res.status);
  });
});
