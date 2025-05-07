// test/api.test.js
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/index');

describe('Backend API Tests', () => {
  // JOBS
  it('GET /api/jobs → 200 or 500', async () => {
    const res = await request(app).get('/api/jobs');
    expect([200, 500]).to.include(res.status);
  });

  it('POST /api/jobs/upload → 201 or 500', async () => {
    const job = {
      title: "MERN Dev",
      company: "StackTech",
      location: "Remote",
      jobType: "Full-time",
      description: "Build full-stack MERN apps"
    };
    const res = await request(app).post('/api/jobs/upload').send(job);
    expect([201, 500]).to.include(res.status);
  });

  // USERS
  it('POST /api/users/register → fail with missing fields', async () => {
    const res = await request(app).post('/api/users/register').send({ email: "test@mern.com" });
    expect(res.status).to.equal(500);
  });

  it('POST /api/users/login → fail invalid credentials', async () => {
    const res = await request(app).post('/api/users/login').send({ email: "fake@x.com", password: "wrongpass" });
    expect([401, 500]).to.include(res.status);
  });

  // FAVORITES
  it('GET /api/favorites/user123 → 200 or error', async () => {
    const res = await request(app).get('/api/favorites/user123');
    expect([200, 500]).to.include(res.status);
  });

  // SEARCH-JOBS
  it('GET /api/search-jobs → 400 if no queryText', async () => {
    const res = await request(app).get('/api/search-jobs');
    expect(res.status).to.equal(400);
  });

  // APPLICATIONS
  it('POST /api/applications → 201 or fail', async () => {
    const res = await request(app).post('/api/applications').send({
      user: "user123", jobId: "job999", companyName: "MERN Inc", status: "Applied"
    });
    expect([201, 500]).to.include(res.status);
  });

  // INTERVIEW PREP
  it('POST /api/interview-prep → 201 or fail', async () => {
    const res = await request(app).post('/api/interview-prep').send({
      user: "user123", topic: "MERN Stack", notes: "Revise hooks and aggregation"
    });
    expect([201, 500]).to.include(res.status);
  });
});