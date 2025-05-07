const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/index');

describe('External Job Search Route', () => {
  it('GET /api/search-jobs - missing queryText', async () => {
    const res = await request(app).get('/api/search-jobs');
    expect(res.status).to.equal(400);
  });
});
