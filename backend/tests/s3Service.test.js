const S3Service = require('../src/s3Service');

// Mock AWS SDK
const mockS3Client = {
  send: jest.fn()
};

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(() => mockS3Client),
  ListBucketsCommand: jest.fn()
}));

const { ListBucketsCommand } = require('@aws-sdk/client-s3');

describe('S3Service', () => {
  let s3Service;

  beforeEach(() => {
    jest.clearAllMocks();
    s3Service = new S3Service({ client: mockS3Client });
  });

  describe('listBuckets', () => {
    test('should return list of buckets successfully', async () => {
      const mockBuckets = [
        {
          Name: 'test-bucket-1',
          CreationDate: new Date('2023-01-01T00:00:00.000Z')
        },
        {
          Name: 'test-bucket-2',
          CreationDate: new Date('2023-01-02T00:00:00.000Z')
        }
      ];

      mockS3Client.send.mockResolvedValue({
        Buckets: mockBuckets
      });

      const result = await s3Service.listBuckets();

      expect(result).toEqual(mockBuckets);
      expect(mockS3Client.send).toHaveBeenCalledTimes(1);
      expect(ListBucketsCommand).toHaveBeenCalledWith({});
    });

    test('should return empty array when no buckets exist', async () => {
      mockS3Client.send.mockResolvedValue({
        Buckets: []
      });

      const result = await s3Service.listBuckets();

      expect(result).toEqual([]);
      expect(mockS3Client.send).toHaveBeenCalledTimes(1);
    });

    test('should return empty array when Buckets is undefined', async () => {
      mockS3Client.send.mockResolvedValue({});

      const result = await s3Service.listBuckets();

      expect(result).toEqual([]);
      expect(mockS3Client.send).toHaveBeenCalledTimes(1);
    });

    test('should throw error when S3 client fails', async () => {
      const errorMessage = 'Access denied';
      mockS3Client.send.mockRejectedValue(new Error(errorMessage));

      await expect(s3Service.listBuckets()).rejects.toThrow(
        `Failed to list S3 buckets: ${errorMessage}`
      );
      expect(mockS3Client.send).toHaveBeenCalledTimes(1);
    });

    test('should handle network errors', async () => {
      const networkError = new Error('Network timeout');
      mockS3Client.send.mockRejectedValue(networkError);

      await expect(s3Service.listBuckets()).rejects.toThrow(
        'Failed to list S3 buckets: Network timeout'
      );
    });
  });

  describe('constructor', () => {
    test('should create S3Service with default region', () => {
      const service = new S3Service();
      expect(service.client).toBeDefined();
    });

    test('should create S3Service with custom region', () => {
      const service = new S3Service({ region: 'us-east-1' });
      expect(service.client).toBeDefined();
    });

    test('should create S3Service with custom client', () => {
      const customClient = { custom: true };
      const service = new S3Service({ client: customClient });
      expect(service.client).toBe(customClient);
    });
  });
});