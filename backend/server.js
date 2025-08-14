const createApp = require('./app');
const redis = require('redis');

const PORT = 5000;

const client = redis.createClient({ host: 'localhost', port: 6379 });
client.connect();

const { app } = createApp(client);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});