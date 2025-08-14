const request = require('supertest');
const createApp = require('../app');

// Mock S3Service
const mockS3Service = {
  mockBuckets: [],
  error: null,
  
  async listBuckets() {
    if (this.error) {
      throw new Error(this.error);
    }
    return this.mockBuckets || [];
  },
  
  setMockBuckets(buckets) {
    this.mockBuckets = buckets;
  },
  
  setError(error) {
    this.error = error;
  }
};

describe('Buckets API', () => {
  let app;

  beforeAll(() => {
    const appInstance = createApp(global.mockClient, mockS3Service);
    app = appInstance.app;
  });

  beforeEach(() => {
    // Reset mock state
    mockS3Service.mockBuckets = [];
    mockS3Service.error = null;
  });

  describe('GET /api/buckets', () => {
    test('should return empty array when no buckets exist', async () => {
      mockS3Service.setMockBuckets([]);

      const response = await request(app).get('/api/buckets');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return list of S3 buckets', async () => {
      const mockBuckets = [
        {
          Name: 'test-bucket-1',
          CreationDate: '2023-01-01T00:00:00.000Z'
        },
        {
          Name: 'test-bucket-2',
          CreationDate: '2023-01-02T00:00:00.000Z'
        }
      ];

      mockS3Service.setMockBuckets(mockBuckets);

      const response = await request(app).get('/api/buckets');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBuckets);
      expect(response.body).toHaveLength(2);
    });

    test('should return 500 when S3 service throws error', async () => {
      mockS3Service.setError('AWS credentials not configured');

      const response = await request(app).get('/api/buckets');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'AWS credentials not configured'
      });
    });

    test('should handle S3 service connection errors', async () => {
      mockS3Service.setError('Failed to list S3 buckets: Network error');

      const response = await request(app).get('/api/buckets');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to list S3 buckets: Network error'
      });
    });
  });
});