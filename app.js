
/**
 * ==============================================
 * Listing App - Main Application File
 * ==============================================
 * This is the entry point of the application.
 * It sets up Express.js server with all necessary
 * middleware and routes.
 * ==============================================
 */

// Load environment variables from .env file
// This must be called before using any process.env variables
require('dotenv').config();

// Import required packages
const express = require('express');
const path = require('path');  
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Import database connection
const { testConnection } = require('./config/db');

// Import routes
const listingRoutes = require('./routes/listingRoutes');

// Create Express application instance
const app = express();

// ==========================================
// Configuration
// ==========================================

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// Middleware
// ==========================================

/**
 * Serve static files from the 'public' directory
 * This allows access to CSS, JavaScript, images, etc.
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Parse URL-encoded bodies (form data)
 * extended: true allows for nested objects in form data
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Parse JSON bodies (for API requests)
 */
app.use(bodyParser.json());

/**
 * Method Override Middleware
 * Allows using HTTP verbs like PUT and DELETE
 * in places where the client doesn't support them
 * 
 * Used with a query parameter: ?_method=PUT or ?_method=DELETE
 */
app.use(methodOverride('_method'));

/**
 * Request Logger Middleware
 * Logs each incoming request to the console
 */
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    next();
});

// ==========================================
// Routes
// ==========================================

/**
 * Mount listing routes
 * All routes defined in listingRoutes.js will be available
 */
app.use('/', listingRoutes);

/**
 * API Routes are also included in listingRoutes.js
 * under the /api prefix
 */

// ==========================================
// Error Handling
// ==========================================

/**
 * 404 Not Found Handler
 * This middleware catches all requests that don't match any route
 */
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

/**
 * Global Error Handler
 * This middleware catches all errors passed to next(error)
 */
app.use((err, req, res, next) => {
    // Log the error for debugging
    console.error('❌ Error:', err.message);
    console.error('   Stack:', err.stack);
    
    // Set the response status code
    const statusCode = err.status || 500;
    
    // Check if the request expects JSON (API request)
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // Return JSON error response for API requests
        return res.status(statusCode).json({
            success: false,
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
    
    // Render error page for web requests
    res.status(statusCode).render('index', {
        title: statusCode === 404 ? 'Page Not Found' : 'Error',
        listings: [],
        count: 0,
        message: null,
        error: statusCode === 404 
            ? 'The page you are looking for does not exist.' 
            : 'An unexpected error occurred. Please try again later.'
    });
});

// ==========================================
// Start Server
// ==========================================

/**
 * Initialize and start the server
 * Tests database connection before starting
 */
async function startServer() {
    try {
        // Test database connection
        console.log('\n🔄 Connecting to database...');
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.log('⚠️  Server starting without database connection.');
            console.log('   Some features may not work properly.\n');
        }
        
        // Start the Express server
        app.listen(PORT, () => {
            console.log('\n========================================');
            console.log('   📋 Listing App Server Started!');
            console.log('========================================');
            console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`   Server running at: http://localhost:${PORT}`);
            console.log('========================================');
            console.log('\n📌 Available Routes:');
            console.log(`   Home Page:     http://localhost:${PORT}/`);
            console.log(`   Create Form:   http://localhost:${PORT}/listings/new`);
            console.log(`   API Endpoints: http://localhost:${PORT}/api/listings`);
            console.log('\n🛑 Press Ctrl+C to stop the server\n');
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    console.error(error.stack);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise);
    console.error('   Reason:', reason);
});

// Start the server
startServer();

// Export app for testing purposes
module.exports = app;
