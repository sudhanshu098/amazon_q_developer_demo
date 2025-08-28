const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for better performance and error handling
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  idleTimeout: 300000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test initial connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', {
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

// Initialize connection test
testConnection().catch(error => {
  console.error('Failed to establish database connection on startup');
  process.exit(1);
});

// Utility function to execute queries with proper error handling
const executeQuery = async (query, params = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', {
      error: error.message,
      code: error.code,
      query: query.substring(0, 100) + '...', // Log first 100 chars of query
      timestamp: new Date().toISOString()
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Utility function for transactions
const executeTransaction = async (queries) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const results = [];
    for (const { query, params } of queries) {
      const [result] = await connection.execute(query, params);
      results.push(result);
    }
    
    await connection.commit();
    return results;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Transaction error:', {
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Legacy callback-style query function for backward compatibility
const query = (sql, params, callback) => {
  if (typeof params === 'function') {
    callback = params;
    params = [];
  }
  
  executeQuery(sql, params)
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

// Health check function
const checkHealth = async () => {
  try {
    await executeQuery('SELECT 1');
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString() 
    };
  }
};

// Graceful shutdown
const closePool = async () => {
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error.message);
  }
};

// Handle process termination
process.on('SIGINT', closePool);
process.on('SIGTERM', closePool);

module.exports = {
  query, // Legacy callback interface
  executeQuery, // Promise-based interface
  executeTransaction, // Transaction support
  checkHealth, // Health check
  closePool, // Graceful shutdown
  pool // Direct pool access if needed
};