/**
 * ==============================================
 * Listing Model
 * ==============================================
 * This file contains all database operations
 * related to listings (CRUD operations)
 * ==============================================
 */

// Import the database connection pool
const { pool } = require('../config/db');

/**
 * Listing Model Object
 * Contains all methods for interacting with the listings table
 */
const ListingModel = {
    
    /**
     * Get all listings from the database
     * @returns {Promise<Array>} Array of listing objects
     */
    async getAll() {
        try {
            // SQL query to select all listings, ordered by newest first
            const sql = `
                SELECT * FROM listings 
                ORDER BY created_at DESC
            `;
            
            // Execute the query
            const [rows] = await pool.query(sql);
            return rows;
        } catch (error) {
            console.error('Error in getAll:', error.message);
            throw error;
        }
    },
    
    /**
     * Get a single listing by ID
     * @param {number} id - The listing ID
     * @returns {Promise<Object|null>} Listing object or null if not found
     */
    async getById(id) {
        try {
            // SQL query with parameterized query to prevent SQL injection
            const sql = `
                SELECT * FROM listings 
                WHERE id = ?
            `;
            
            // Execute the query with the ID parameter
            const [rows] = await pool.query(sql, [id]);
            
            // Return the first result or null if not found
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error in getById:', error.message);
            throw error;
        }
    },
    
    /**
     * Create a new listing
     * @param {Object} listingData - The listing data
     * @param {string} listingData.title - Listing title
     * @param {string} listingData.description - Listing description
     * @param {number} listingData.price - Listing price
     * @param {string} listingData.location - Listing location
     * @returns {Promise<Object>} The created listing with ID
     */
    async create(listingData) {
        try {
            // Destructure the listing data
            const { title, description, price, location } = listingData;
            
            // SQL query to insert a new listing
            const sql = `
                INSERT INTO listings (title, description, price, location) 
                VALUES (?, ?, ?, ?)
            `;
            
            // Execute the query with the data
            const [result] = await pool.query(sql, [
                title,
                description,
                price,
                location
            ]);
            
            // Return the created listing with the generated ID
            return {
                id: result.insertId,
                title,
                description,
                price,
                location
            };
        } catch (error) {
            console.error('Error in create:', error.message);
            throw error;
        }
    },
    
    /**
     * Update an existing listing
     * @param {number} id - The listing ID
     * @param {Object} listingData - The updated listing data
     * @returns {Promise<Object|null>} Updated listing or null if not found
     */
    async update(id, listingData) {
        try {
            // Destructure the listing data
            const { title, description, price, location } = listingData;
            
            // SQL query to update a listing
            const sql = `
                UPDATE listings 
                SET title = ?, description = ?, price = ?, location = ? 
                WHERE id = ?
            `;
            
            // Execute the query
            const [result] = await pool.query(sql, [
                title,
                description,
                price,
                location,
                id
            ]);
            
            // Check if any row was affected
            if (result.affectedRows === 0) {
                return null;
            }
            
            // Return the updated listing
            return {
                id,
                title,
                description,
                price,
                location
            };
        } catch (error) {
            console.error('Error in update:', error.message);
            throw error;
        }
    },
    
    /**
     * Delete a listing by ID
     * @param {number} id - The listing ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async delete(id) {
        try {
            // SQL query to delete a listing
            const sql = `
                DELETE FROM listings 
                WHERE id = ?
            `;
            
            // Execute the query
            const [result] = await pool.query(sql, [id]);
            
            // Return true if a row was deleted
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error in delete:', error.message);
            throw error;
        }
    },
    
    /**
     * Search listings by title or location
     * @param {string} searchTerm - The search term
     * @returns {Promise<Array>} Array of matching listings
     */
    async search(searchTerm) {
        try {
            // SQL query with LIKE operator for searching
            const sql = `
                SELECT * FROM listings 
                WHERE title LIKE ? OR location LIKE ? OR description LIKE ?
                ORDER BY created_at DESC
            `;
            
            // Create the search pattern with wildcards
            const searchPattern = `%${searchTerm}%`;
            
            // Execute the query
            const [rows] = await pool.query(sql, [
                searchPattern,
                searchPattern,
                searchPattern
            ]);
            
            return rows;
        } catch (error) {
            console.error('Error in search:', error.message);
            throw error;
        }
    },
    
    /**
     * Count total number of listings
     * @returns {Promise<number>} Total count of listings
     */
    async count() {
        try {
            const sql = 'SELECT COUNT(*) as count FROM listings';
            const [rows] = await pool.query(sql);
            return rows[0].count;
        } catch (error) {
            console.error('Error in count:', error.message);
            throw error;
        }
    }
};

// Export the model for use in controllers
module.exports = ListingModel;
