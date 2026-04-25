/**
 * ==============================================
 * Database Configuration File
 * ==============================================
 * This file handles the MySQL database connection
 * using the mysql2 package with Promise support
 * ==============================================
 */

// Import required packages
const mysql = require('mysql2');
require('dotenv').config();

/**
 * Create a connection pool for better performance
 * Connection pools allow multiple connections to be reused
 * This is more efficient than creating new connections for each query
 */
const pool = mysql.createPool({
    // Database server hostname (usually 'localhost' for local development)
    host: process.env.DB_HOST || 'localhost',
    
    // MySQL default port is 3306
    port: process.env.DB_PORT || 3306,
    
    // Your MySQL username (default is 'root')
    user: process.env.DB_USER || 'root',
    
    // Your MySQL password (set in .env file)
    password: process.env.DB_PASSWORD || '',
    
    // Name of the database to connect to
    database: process.env.DB_NAME || 'listing_app',
    
    // Wait for connection before throwing error (in milliseconds)
    waitForConnections: true,
    
    // Maximum number of connections in the pool
    connectionLimit: 10,
    
    // Maximum time to wait for a connection (in milliseconds)
    queueLimit: 0,
    
    // Enable timezone support
    timezone: 'local'
});

/**
 * Convert the pool to use Promises
 * This allows us to use async/await syntax
 * instead of callbacks
 */
const promisePool = pool.promise();

/**
 * Test the database connection
 * This function verifies that the connection is working
 */
async function testConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Database connected successfully!');
        console.log(`   Connected to database: ${process.env.DB_NAME}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(`   Error: ${error.message}`);
        console.error('\n   Please check the following:');
        console.error('   1. Is MySQL server running?');
        console.error('   2. Are the credentials in .env correct?');
        console.error('   3. Does the database "listing_app" exist?');
        console.error('   4. Run the SQL script in database.sql to create the database\n');
        return false;
    }
}

/**
 * Handle pool errors
 * This prevents the app from crashing on connection errors
 */
pool.on('error', (err) => {
    console.error('Database pool error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
    }
});

// Export the pool and test function for use in other files
module.exports = {
    pool: promisePool,
    testConnection
};