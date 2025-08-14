const express = require('express');
const redis = require('redis');
const cors = require('cors');

function createApp(redisClient) {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  const client = redisClient || redis.createClient({ host: 'localhost', port: 6379 });

  // GET all users
  app.get('/api/users', async (req, res) => {
    try {
      const keys = await client.keys('user:*');
      const users = [];
      for (const key of keys) {
        const user = await client.hGetAll(key);
        users.push({ id: parseInt(user.id), name: user.name, email: user.email });
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET user by ID
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await client.hGetAll(`user:${req.params.id}`);
      if (!user.id) return res.status(404).json({ error: 'User not found' });
      res.json({ id: parseInt(user.id), name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST create user
  app.post('/api/users', async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
      
      const id = await client.incr('user_counter');
      await client.hSet(`user:${id}`, { id, name, email });
      res.status(201).json({ id, name, email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT update user
  app.put('/api/users/:id', async (req, res) => {
    try {
      const exists = await client.exists(`user:${req.params.id}`);
      if (!exists) return res.status(404).json({ error: 'User not found' });
      
      const { name, email } = req.body;
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      
      await client.hSet(`user:${req.params.id}`, updates);
      const user = await client.hGetAll(`user:${req.params.id}`);
      res.json({ id: parseInt(user.id), name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE user
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const deleted = await client.del(`user:${req.params.id}`);
      if (!deleted) return res.status(404).json({ error: 'User not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return { app, client };
}

module.exports = createApp;