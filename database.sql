-- ==============================================
-- Listing App - Database Setup Script
-- ==============================================
-- Run this script in MySQL to create the database
-- and table for the listing application
-- ==============================================

-- ==========================================
-- Create Database
-- ==========================================

-- Drop database if it exists (use with caution in production!)
DROP DATABASE IF EXISTS listing_app;

-- Create the database
CREATE DATABASE listing_app
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Select the database for use
USE listing_app;

-- ==========================================
-- Create Tables
-- ==========================================

-- Create the listings table
CREATE TABLE listings (
    -- Primary Key: Auto-incrementing integer
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Listing title: Required, max 255 characters
    title VARCHAR(255) NOT NULL,
    
    -- Listing description: Required, can be long text
    description TEXT NOT NULL,
    
    -- Listing price: Decimal number for currency
    -- 10 total digits, 2 after decimal point
    -- Example: 12345678.99 (max value)
    price DECIMAL(10, 2) NOT NULL,
    
    -- Listing location: Required, max 255 characters
    location VARCHAR(255) NOT NULL,
    
    -- Timestamp when the listing was created
    -- Automatically set to current time on insert
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Index for faster searches on title
    INDEX idx_title (title),
    
    -- Index for faster searches on location
    INDEX idx_location (location),
    
    -- Index for sorting by created_at
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- Sample Data (Optional)
-- ==========================================

-- Insert sample listings for testing
INSERT INTO listings (title, description, price, location) VALUES
(
    'Cozy Apartment in Downtown',
    'Beautiful one-bedroom apartment located in the heart of the city. Features modern amenities, natural lighting, and is within walking distance to shops, restaurants, and public transportation. Perfect for singles or couples looking for a comfortable urban living space.',
    1500.00,
    'New York, NY'
),
(
    'Spacious Family Home with Garden',
    'Lovely three-bedroom house with a large backyard garden. Recently renovated kitchen and bathrooms. Located in a quiet neighborhood with excellent schools nearby. Includes a two-car garage and central air conditioning. Move-in ready!',
    450000.00,
    'Los Angeles, CA'
),
(
    'Modern Office Space for Rent',
    'Professional office space in a prime business district. 500 square meters of open floor plan with meeting rooms, kitchen area, and dedicated parking. High-speed internet included. Ideal for startups or growing businesses.',
    3500.00,
    'Chicago, IL'
),
(
    'Vintage Convertible Car',
    'Classic 1965 Ford Mustang convertible in excellent condition. Red exterior with black leather interior. Recently restored engine, new tires, and premium sound system. A true collectors item that runs beautifully.',
    55000.00,
    'Miami, FL'
),
(
    'Professional Photography Equipment',
    'Complete photography kit including Canon EOS R5 camera body, multiple lenses (24-70mm f/2.8, 70-200mm f/2.8, 50mm f/1.4), professional lighting setup, tripods, and carrying cases. Perfect for professional photographers or serious enthusiasts.',
    8500.00,
    'Seattle, WA'
),
(
    'Beachfront Vacation Rental',
    'Stunning beachfront property available for weekly or monthly rentals. Two bedrooms, full kitchen, and private beach access. Wake up to ocean views every morning. Perfect for family vacations or romantic getaways.',
    450.00,
    'San Diego, CA'
);

-- ==========================================
-- Verification Queries
-- ==========================================

-- Show all listings
SELECT * FROM listings;

-- Show table structure
DESCRIBE listings;

-- Count total listings
SELECT COUNT(*) AS total_listings FROM listings;

-- ==========================================
-- Useful Queries for Testing
-- ==========================================

-- Search listings by title or location
-- SELECT * FROM listings WHERE title LIKE '%Apartment%' OR location LIKE '%New York%';

-- Get listings within a price range
-- SELECT * FROM listings WHERE price BETWEEN 1000 AND 5000;

-- Get the most recent listings
-- SELECT * FROM listings ORDER BY created_at DESC LIMIT 5;

-- Update a listing
-- UPDATE listings SET price = 1600.00 WHERE id = 1;

-- Delete a listing
-- DELETE FROM listings WHERE id = 1;
