const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

/**
 * S3 Service for managing S3 operations
 */
class S3Service {
  constructor(options = {}) {
    this.client = options.client || new S3Client({
      region: options.region || 'ap-south-1',
      credentials: options.credentials
    });
  }

  /**
   * List all S3 buckets
   * @returns {Promise<Array>} Array of bucket objects with Name and CreationDate
   */
  async listBuckets() {
    try {
      const command = new ListBucketsCommand({});
      const response = await this.client.send(command);
      
      return response.Buckets || [];
    } catch (error) {
      throw new Error(`Failed to list S3 buckets: ${error.message}`);
    }
  }
}

module.exports = S3Service;