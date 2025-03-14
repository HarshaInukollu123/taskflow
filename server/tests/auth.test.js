import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js';

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  },10000);

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  },10000);

  it('should log in an existing user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  },10000);
});