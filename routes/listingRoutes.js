/**
 * ==============================================
 * Listing Routes
 * ==============================================
 * This file defines all routes for the listing
 * application (both web routes and API routes)
 * ==============================================
 */

// Import Express router
const express = require('express');
const router = express.Router();

// Import the listing controller
const ListingController = require('../controllers/listingController');

// ==========================================
// Web Routes (Render EJS Views)
// ==========================================

/**
 * Home Page - Display all listings
 * Route: GET /
 */
router.get('/', ListingController.index);

/**
 * Search listings
 * Route: GET /search
 */
router.get('/search', ListingController.search);

/**
 * Display create listing form
 * Route: GET /listings/new
 */
router.get('/listings/new', ListingController.showCreateForm);

/**
 * Display single listing details
 * Route: GET /listings/:id
 * Note: This route must come after /listings/new
 */
router.get('/listings/:id', ListingController.show);

/**
 * Display edit listing form
 * Route: GET /listings/:id/edit
 */
router.get('/listings/:id/edit', ListingController.showEditForm);

/**
 * Create a new listing (form submission)
 * Route: POST /listings
 */
router.post('/listings', ListingController.create);

/**
 * Update an existing listing (form submission)
 * Route: PUT /listings/:id
 * Note: Uses method-override for PUT method
 */
router.put('/listings/:id', ListingController.update);

/**
 * Delete a listing
 * Route: DELETE /listings/:id
 * Note: Uses method-override for DELETE method
 */
router.delete('/listings/:id', ListingController.delete);

// ==========================================
// API Routes (JSON Responses)
// ==========================================

/**
 * API: Get all listings
 * Route: GET /api/listings
 */
router.get('/api/listings', ListingController.apiGetAll);

/**
 * API: Get single listing
 * Route: GET /api/listings/:id
 */
router.get('/api/listings/:id', ListingController.apiGetById);

/**
 * API: Create a new listing
 * Route: POST /api/listings
 */
router.post('/api/listings', ListingController.apiCreate);

/**
 * API: Update a listing
 * Route: PUT /api/listings/:id
 */
router.put('/api/listings/:id', ListingController.apiUpdate);

/**
 * API: Delete a listing
 * Route: DELETE /api/listings/:id
 */
router.delete('/api/listings/:id', ListingController.apiDelete);

// Export the router for use in app.js
module.exports = router;
