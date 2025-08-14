const request = require('supertest');
const createApp = require('../app');

describe('Users API', () => {
  let app;

  beforeAll(() => {
    const appInstance = createApp(global.mockClient, null);
    app = appInstance.app;
  });

  describe('GET /api/users', () => {
    test('should return empty array when no users exist', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all users', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });
      await global.mockClient.hSet('user:2', { id: '2', name: 'Jane Smith', email: 'jane@example.com' });

      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ])
      );
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const response = await request(app).get('/api/users/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    test('should return 400 when name is missing', async () => {
      const userData = { email: 'john@example.com' };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and email required' });
    });

    test('should return 400 when email is missing', async () => {
      const userData = { name: 'John Doe' };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and email required' });
    });

    test('should return 400 when both name and email are missing', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Name and email required' });
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update existing user', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const updateData = { name: 'John Updated', email: 'john.updated@example.com' };

      const response = await request(app)
        .put('/api/users/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Updated',
        email: 'john.updated@example.com'
      });
    });

    test('should update user with partial data', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const updateData = { name: 'John Updated' };

      const response = await request(app)
        .put('/api/users/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Updated',
        email: 'john@example.com'
      });
    });

    test('should return 404 for non-existent user', async () => {
      const updateData = { name: 'John Updated' };

      const response = await request(app)
        .put('/api/users/999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should delete existing user', async () => {
      await global.mockClient.hSet('user:1', { id: '1', name: 'John Doe', email: 'john@example.com' });

      const response = await request(app).delete('/api/users/1');
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app).delete('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('Integration tests', () => {
    test('should create, read, update, and delete user', async () => {
      // Create user
      const createResponse = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      
      expect(createResponse.status).toBe(201);
      const userId = createResponse.body.id;

      // Read user
      const readResponse = await request(app).get(`/api/users/${userId}`);
      expect(readResponse.status).toBe(200);
      expect(readResponse.body.name).toBe('Test User');

      // Update user
      const updateResponse = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: 'Updated User' });
      
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.name).toBe('Updated User');

      // Delete user
      const deleteResponse = await request(app).delete(`/api/users/${userId}`);
      expect(deleteResponse.status).toBe(204);

      // Verify deletion
      const verifyResponse = await request(app).get(`/api/users/${userId}`);
      expect(verifyResponse.status).toBe(404);
    });
  });
});