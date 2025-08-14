const createApp = require('./app');
const redis = require('redis');
const S3Service = require('./src/s3Service');

const PORT = 5000;

const client = redis.createClient({ host: 'localhost', port: 6379 });
client.connect();

// Initialize S3 service
let s3Service;
try {
  s3Service = new S3Service();
  console.log('S3 service initialized successfully');
} catch (error) {
  console.warn('S3 service initialization failed:', error.message);
  console.warn('S3 endpoints will return errors. Please configure AWS credentials.');
  s3Service = null;
}

const { app } = createApp(client, s3Service);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});