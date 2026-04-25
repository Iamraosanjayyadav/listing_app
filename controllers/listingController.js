/**
 * ==============================================
 * Listing Controller
 * ==============================================
 * This file handles all the logic for processing
 * requests and sending responses
 * ==============================================
 */

// Import the listing model
const ListingModel = require('../models/listingModel');

/**
 * Listing Controller Object
 * Contains all handler functions for listing routes
 */
const ListingController = {
    
    /**
     * Display all listings on the home page
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async index(req, res) {
        try {
            // Get all listings from the database
            const listings = await ListingModel.getAll();
            
            // Get the total count of listings
            const count = await ListingModel.count();
            
            // Render the index view with the listings data
            res.render('index', {
                title: 'All Listings',
                listings,
                count,
                message: req.query.message || null, // Success messages from redirects
                error: null
            });
        } catch (error) {
            console.error('Error in index controller:', error.message);
            res.status(500).render('index', {
                title: 'All Listings',
                listings: [],
                count: 0,
                message: null,
                error: 'Failed to load listings. Please try again.'
            });
        }
    },
    
    /**
     * Display the form to create a new listing
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    showCreateForm(req, res) {
        // Render the create view with empty form data
        res.render('create', {
            title: 'Create New Listing',
            listing: {
                title: '',
                description: '',
                price: '',
                location: ''
            },
            error: null
        });
    },
    
    /**
     * Handle the creation of a new listing
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async create(req, res) {
        try {
            // Extract data from the request body
            const { title, description, price, location } = req.body;
            
            // Validate the input data
            const errors = validateListingData(req.body);
            
            // If there are validation errors, re-render the form with errors
            if (errors.length > 0) {
                return res.status(400).render('create', {
                    title: 'Create New Listing',
                    listing: req.body,
                    error: errors.join(', ')
                });
            }
            
            // Create the listing in the database
            const newListing = await ListingModel.create({
                title: title.trim(),
                description: description.trim(),
                price: parseFloat(price),
                location: location.trim()
            });
            
            console.log(`✅ New listing created with ID: ${newListing.id}`);
            
            // Redirect to the listing details page with success message
            res.redirect(`/listings/${newListing.id}?message=Listing created successfully!`);
        } catch (error) {
            console.error('Error in create controller:', error.message);
            res.status(500).render('create', {
                title: 'Create New Listing',
                listing: req.body,
                error: 'Failed to create listing. Please try again.'
            });
        }
    },
    
    /**
     * Display a single listing's details
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async show(req, res) {
        try {
            // Get the listing ID from the URL parameter
            const { id } = req.params;
            
            // Validate the ID
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).render('show', {
                    title: 'Listing Not Found',
                    listing: null,
                    error: 'Invalid listing ID provided.'
                });
            }
            
            // Get the listing from the database
            const listing = await ListingModel.getById(parseInt(id));
            
            // If listing not found, show error
            if (!listing) {
                return res.status(404).render('show', {
                    title: 'Listing Not Found',
                    listing: null,
                    error: 'The listing you are looking for does not exist.'
                });
            }
            
            // Render the show view with the listing data
            res.render('show', {
                title: listing.title,
                listing,
                message: req.query.message || null,
                error: null
            });
        } catch (error) {
            console.error('Error in show controller:', error.message);
            res.status(500).render('show', {
                title: 'Error',
                listing: null,
                error: 'Failed to load listing details. Please try again.'
            });
        }
    },
    
    /**
     * Display the form to edit an existing listing
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async showEditForm(req, res) {
        try {
            // Get the listing ID from the URL parameter
            const { id } = req.params;
            
            // Get the listing from the database
            const listing = await ListingModel.getById(parseInt(id));
            
            // If listing not found, redirect to home with error
            if (!listing) {
                return res.redirect('/?error=Listing not found');
            }
            
            // Render the edit view with the listing data
            res.render('edit', {
                title: `Edit: ${listing.title}`,
                listing,
                error: null
            });
        } catch (error) {
            console.error('Error in showEditForm controller:', error.message);
            res.redirect('/?error=Failed to load listing for editing');
        }
    },
    
    /**
     * Handle the update of an existing listing
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async update(req, res) {
        try {
            // Get the listing ID from the URL parameter
            const { id } = req.params;
            
            // Extract data from the request body
            const { title, description, price, location } = req.body;
            
            // Validate the input data
            const errors = validateListingData(req.body);
            
            // If there are validation errors, re-render the form with errors
            if (errors.length > 0) {
                return res.status(400).render('edit', {
                    title: `Edit Listing #${id}`,
                    listing: { ...req.body, id },
                    error: errors.join(', ')
                });
            }
            
            // Update the listing in the database
            const updatedListing = await ListingModel.update(parseInt(id), {
                title: title.trim(),
                description: description.trim(),
                price: parseFloat(price),
                location: location.trim()
            });
            
            // If listing not found
            if (!updatedListing) {
                return res.status(404).render('edit', {
                    title: 'Edit Listing',
                    listing: { ...req.body, id },
                    error: 'Listing not found.'
                });
            }
            
            console.log(`✅ Listing ${id} updated successfully`);
            
            // Redirect to the listing details page with success message
            res.redirect(`/listings/${id}?message=Listing updated successfully!`);
        } catch (error) {
            console.error('Error in update controller:', error.message);
            res.status(500).render('edit', {
                title: 'Edit Listing',
                listing: { ...req.body, id: req.params.id },
                error: 'Failed to update listing. Please try again.'
            });
        }
    },
    
    /**
     * Handle the deletion of a listing
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async delete(req, res) {
        try {
            // Get the listing ID from the URL parameter
            const { id } = req.params;
            
            // Delete the listing from the database
            const deleted = await ListingModel.delete(parseInt(id));
            
            // If listing not found
            if (!deleted) {
                return res.redirect('/?error=Listing not found');
            }
            
            console.log(`✅ Listing ${id} deleted successfully`);
            
            // Redirect to home page with success message
            res.redirect('/?message=Listing deleted successfully!');
        } catch (error) {
            console.error('Error in delete controller:', error.message);
            res.redirect('/?error=Failed to delete listing. Please try again.');
        }
    },
    
    /**
     * Search listings by keyword
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async search(req, res) {
        try {
            // Get the search term from the query string
            const { q } = req.query;
            
            // If no search term, redirect to home
            if (!q || q.trim() === '') {
                return res.redirect('/');
            }
            
            // Search for listings
            const listings = await ListingModel.search(q.trim());
            
            // Render the index view with search results
            res.render('index', {
                title: `Search Results for "${q}"`,
                listings,
                count: listings.length,
                message: null,
                error: null,
                searchTerm: q
            });
        } catch (error) {
            console.error('Error in search controller:', error.message);
            res.status(500).render('index', {
                title: 'Search Results',
                listings: [],
                count: 0,
                message: null,
                error: 'Search failed. Please try again.'
            });
        }
    },
    
    // ==========================================
    // API Controllers (for REST API endpoints)
    // ==========================================
    
    /**
     * API: Get all listings (JSON response)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async apiGetAll(req, res) {
        try {
            const listings = await ListingModel.getAll();
            res.json({
                success: true,
                count: listings.length,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    /**
     * API: Get single listing (JSON response)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async apiGetById(req, res) {
        try {
            const listing = await ListingModel.getById(parseInt(req.params.id));
            if (!listing) {
                return res.status(404).json({
                    success: false,
                    error: 'Listing not found'
                });
            }
            res.json({
                success: true,
                data: listing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    /**
     * API: Create a new listing (JSON response)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async apiCreate(req, res) {
        try {
            const errors = validateListingData(req.body);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors
                });
            }
            
            const listing = await ListingModel.create({
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                price: parseFloat(req.body.price),
                location: req.body.location.trim()
            });
            
            res.status(201).json({
                success: true,
                data: listing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    /**
     * API: Update a listing (JSON response)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async apiUpdate(req, res) {
        try {
            const errors = validateListingData(req.body);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    errors
                });
            }
            
            const listing = await ListingModel.update(parseInt(req.params.id), {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                price: parseFloat(req.body.price),
                location: req.body.location.trim()
            });
            
            if (!listing) {
                return res.status(404).json({
                    success: false,
                    error: 'Listing not found'
                });
            }
            
            res.json({
                success: true,
                data: listing
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    /**
     * API: Delete a listing (JSON response)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async apiDelete(req, res) {
        try {
            const deleted = await ListingModel.delete(parseInt(req.params.id));
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Listing not found'
                });
            }
            res.json({
                success: true,
                message: 'Listing deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

/**
 * Validate listing data
 * @param {Object} data - The listing data to validate
 * @returns {Array} Array of error messages
 */
function validateListingData(data) {
    const errors = [];
    
    // Validate title
    if (!data.title || data.title.trim() === '') {
        errors.push('Title is required');
    } else if (data.title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
    } else if (data.title.trim().length > 255) {
        errors.push('Title must be less than 255 characters');
    }
    
    // Validate description
    if (!data.description || data.description.trim() === '') {
        errors.push('Description is required');
    } else if (data.description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long');
    }
    
    // Validate price
    if (!data.price || data.price === '') {
        errors.push('Price is required');
    } else {
        const price = parseFloat(data.price);
        if (isNaN(price)) {
            errors.push('Price must be a valid number');
        } else if (price < 0) {
            errors.push('Price cannot be negative');
        } else if (price > 99999999.99) {
            errors.push('Price is too high');
        }
    }
    
    // Validate location
    if (!data.location || data.location.trim() === '') {
        errors.push('Location is required');
    } else if (data.location.trim().length < 2) {
        errors.push('Location must be at least 2 characters long');
    } else if (data.location.trim().length > 255) {
        errors.push('Location must be less than 255 characters');
    }
    
    return errors;
}

// Export the controller for use in routes
module.exports = ListingController;
