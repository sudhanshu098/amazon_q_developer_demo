const request = require('supertest');
const createApp = require('../app');

describe('Edge Cases', () => {
  let app;

  beforeAll(() => {
    const appInstance = createApp(global.mockClient);
    app = appInstance.app;
  });

  describe('Input validation', () => {
    test('should handle empty string name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: '', email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and email required' });
    });

    test('should handle empty string email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: '' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and email required' });
    });

    test('should handle whitespace-only name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: '   ', email: 'test@example.com' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('   ');
    });

    test('should handle special characters in name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'José María', email: 'jose@example.com' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('José María');
    });
  });

  describe('Large data handling', () => {
    test('should handle long names', async () => {
      const longName = 'A'.repeat(1000);
      const response = await request(app)
        .post('/api/users')
        .send({ name: longName, email: 'test@example.com' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(longName);
    });

    test('should handle multiple users creation', async () => {
      const users = [];
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/users')
          .send({ name: `User ${i}`, email: `user${i}@example.com` });
        
        expect(response.status).toBe(201);
        users.push(response.body);
      }

      const getAllResponse = await request(app).get('/api/users');
      expect(getAllResponse.status).toBe(200);
      expect(getAllResponse.body).toHaveLength(10);
    });
  });

  describe('Update edge cases', () => {
    test('should handle update with empty object', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const response = await request(app)
        .put('/api/users/1')
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    test('should handle update with null values', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const response = await request(app)
        .put('/api/users/1')
        .send({ name: null, email: null });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });

  describe('ID handling', () => {
    test('should handle non-numeric ID in GET', async () => {
      const response = await request(app).get('/api/users/abc');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    test('should handle non-numeric ID in PUT', async () => {
      const response = await request(app)
        .put('/api/users/abc')
        .send({ name: 'Test' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    test('should handle non-numeric ID in DELETE', async () => {
      const response = await request(app).delete('/api/users/abc');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    test('should handle negative ID', async () => {
      const response = await request(app).get('/api/users/-1');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});