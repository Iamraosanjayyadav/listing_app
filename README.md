# 📋 Listing App - Complete Full-Stack Web Application

A beginner-friendly, fully functional CRUD web application built with **Node.js**, **Express.js**, **MySQL**, and **EJS** templating engine.

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation Guide](#installation-guide)
7. [MySQL Setup Guide](#mysql-setup-guide)
8. [Running the Application](#running-the-application)
9. [API Documentation](#api-documentation)
10. [Postman Testing Guide](#postman-testing-guide)
11. [Code Explanation](#code-explanation)
12. [Troubleshooting](#troubleshooting)

---

## 🌟 Project Overview

This is a complete **full-stack listing application** that demonstrates the MVC (Model-View-Controller) architecture pattern. Users can create, read, update, and delete listings through a beautiful web interface or RESTful API.

### What You'll Learn

- How to set up a Node.js project with Express.js
- How to connect MySQL database with Node.js
- How to implement MVC architecture
- How to create CRUD operations (Create, Read, Update, Delete)
- How to use EJS templating engine
- How to build RESTful API endpoints
- How to handle forms and validation
- How to use environment variables

---

## ✨ Features

### User Features
- **View All Listings**: Browse all listings on a beautiful grid layout
- **Search Listings**: Search by title, location, or description
- **View Single Listing**: See detailed information about each listing
- **Create Listing**: Add new listings with validation
- **Edit Listing**: Update existing listings
- **Delete Listing**: Remove listings with confirmation

### Technical Features
- **MVC Architecture**: Clean separation of concerns
- **RESTful API**: JSON endpoints for API consumers
- **Input Validation**: Server-side form validation
- **Error Handling**: Comprehensive error handling middleware
- **Responsive Design**: Works on desktop and mobile devices
- **Environment Variables**: Secure configuration management

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MySQL |
| **Database Driver** | mysql2 (with Promises) |
| **Template Engine** | EJS |
| **Configuration** | dotenv |
| **Middleware** | body-parser, method-override |

---

## 📁 Project Structure

```
listing-app/
│
├── config/
│   └── db.js                 # Database connection configuration
│
├── controllers/
│   └── listingController.js  # Request handlers and business logic
│
├── models/
│   └── listingModel.js       # Database operations (CRUD)
│
├── routes/
│   └── listingRoutes.js      # URL route definitions
│
├── views/
│   ├── index.ejs             # Home page - all listings
│   ├── create.ejs            # Create new listing form
│   ├── edit.ejs              # Edit listing form
│   └── show.ejs              # Single listing details
│
├── public/
│   └── styles.css            # CSS styles
│
├── .env                      # Environment variables (create from .env.example)
├── .env.example              # Example environment file
├── app.js                    # Main application entry point
├── package.json              # Project dependencies
├── database.sql              # SQL script for database setup
└── README.md                 # This documentation file
```

### Folder Explanation

| Folder/File | Purpose |
|-------------|---------|
| `config/` | Configuration files (database connection) |
| `controllers/` | Handle requests, process data, send responses |
| `models/` | Database queries and data operations |
| `routes/` | Define URL paths and HTTP methods |
| `views/` | EJS templates for HTML pages |
| `public/` | Static files (CSS, JavaScript, images) |
| `app.js` | Main server setup and startup |

---

## ⚙️ Prerequisites

Before starting, make sure you have the following installed:

### 1. Node.js (v14 or higher)
- Download from: https://nodejs.org/
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. MySQL (v5.7 or higher)
- Download from: https://dev.mysql.com/downloads/mysql/
- Or use XAMPP (easier for beginners): https://www.apachefriends.org/

### 3. Code Editor
- VS Code (recommended): https://code.visualstudio.com/

### 4. API Testing Tool (optional)
- Postman: https://www.postman.com/downloads/
- Or use curl commands

---

## 📥 Installation Guide

### Step 1: Navigate to Project Directory

```bash
cd listing-app
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `mysql2` - MySQL database driver
- `ejs` - Template engine
- `dotenv` - Environment variables
- `body-parser` - Parse request bodies
- `method-override` - Support PUT and DELETE methods
- `nodemon` (dev) - Auto-restart server during development

### Step 3: Configure Environment Variables

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` with your MySQL credentials:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=listing_app
```

---

## 🗄️ MySQL Setup Guide

### Installing MySQL

#### Option A: Using XAMPP (Recommended for Beginners)

1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Start the MySQL module
5. Click "Admin" to open phpMyAdmin

#### Option B: Installing MySQL Directly

**Windows:**
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and follow the setup wizard
3. Set a root password (remember this!)
4. Complete the installation

**macOS:**
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

**Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Creating the Database

#### Option 1: Using Command Line

1. Open terminal/command prompt
2. Connect to MySQL:
   ```bash
   mysql -u root -p
   ```
3. Enter your MySQL root password
4. Run the SQL script:
   ```sql
   source /path/to/database.sql
   ```
   Or copy and paste the contents of `database.sql`

#### Option 2: Using phpMyAdmin

1. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
2. Click "SQL" tab
3. Copy and paste the contents of `database.sql`
4. Click "Go"

#### Option 3: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your database
3. File → Open SQL Script → Select `database.sql`
4. Execute the script (lightning bolt icon)

### Manual Database Creation

If you prefer to create manually, run these SQL commands:

```sql
-- Create database
CREATE DATABASE listing_app;

-- Use the database
USE listing_app;

-- Create listings table
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Verifying Database Setup

Run these queries to verify:

```sql
-- Show databases
SHOW DATABASES;

-- Select database
USE listing_app;

-- Show tables
SHOW TABLES;

-- Show table structure
DESCRIBE listings;

-- View sample data
SELECT * FROM listings;
```

---

## 🚀 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Successful Startup

You should see:

```
========================================
   📋 Listing App Server Started!
========================================
   Environment: development
   Server running at: http://localhost:3000
========================================

📌 Available Routes:
   Home Page:     http://localhost:3000/
   Create Form:   http://localhost:3000/listings/new
   API Endpoints: http://localhost:3000/api/listings
```

### Opening the Application

Open your browser and navigate to:
- **Home Page**: http://localhost:3000
- **Create Listing**: http://localhost:3000/listings/new

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Get All Listings
```
GET /api/listings
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "title": "Cozy Apartment in Downtown",
      "description": "Beautiful one-bedroom apartment...",
      "price": 1500.00,
      "location": "New York, NY",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Get Single Listing
```
GET /api/listings/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Cozy Apartment in Downtown",
    "description": "Beautiful one-bedroom apartment...",
    "price": 1500.00,
    "location": "New York, NY",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Create New Listing
```
POST /api/listings
```

**Request Body:**
```json
{
  "title": "My New Listing",
  "description": "Detailed description of the listing",
  "price": 999.99,
  "location": "Boston, MA"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 7,
    "title": "My New Listing",
    "description": "Detailed description of the listing",
    "price": 999.99,
    "location": "Boston, MA"
  }
}
```

#### 4. Update Listing
```
PUT /api/listings/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "price": 1200.00,
  "location": "Updated Location"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    "price": 1200.00,
    "location": "Updated Location"
  }
}
```

#### 5. Delete Listing
```
DELETE /api/listings/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Listing deleted successfully"
}
```

---

## 🧪 Postman Testing Guide

### Setting Up Postman

1. Download Postman from https://www.postman.com/downloads/
2. Create a new collection named "Listing App API"
3. Set base URL as a variable: `{{base_url}} = http://localhost:3000`

### Test Cases

#### Test 1: Get All Listings

- **Method**: GET
- **URL**: `{{base_url}}/api/listings`
- **Expected**: 200 OK with array of listings

#### Test 2: Create New Listing

- **Method**: POST
- **URL**: `{{base_url}}/api/listings`
- **Headers**: Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "title": "Test Listing",
  "description": "This is a test listing description that is at least 10 characters",
  "price": 500,
  "location": "Test City"
}
```
- **Expected**: 201 Created with new listing

#### Test 3: Get Single Listing

- **Method**: GET
- **URL**: `{{base_url}}/api/listings/1`
- **Expected**: 200 OK with listing object

#### Test 4: Update Listing

- **Method**: PUT
- **URL**: `{{base_url}}/api/listings/1`
- **Headers**: Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "title": "Updated Test Listing",
  "description": "Updated description that is still long enough for validation",
  "price": 750,
  "location": "Updated City"
}
```
- **Expected**: 200 OK with updated listing

#### Test 5: Delete Listing

- **Method**: DELETE
- **URL**: `{{base_url}}/api/listings/7`
- **Expected**: 200 OK with success message

#### Test 6: Validation Error

- **Method**: POST
- **URL**: `{{base_url}}/api/listings`
- **Headers**: Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "title": "",
  "description": "short",
  "price": -100,
  "location": ""
}
```
- **Expected**: 400 Bad Request with validation errors

---

## 📚 Code Explanation

### MVC Architecture Flow

```
Request → Routes → Controller → Model → Database
                ↓
Response ← Controller ← Model ← Database
```

### Key Files Explained

#### 1. `config/db.js` - Database Connection

```javascript
// Creates a connection pool for better performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    // ... configuration
});

// Converts to Promise-based for async/await
const promisePool = pool.promise();
```

**Why Connection Pool?**
- Reuses existing connections
- Better performance
- Handles concurrent requests efficiently

#### 2. `models/listingModel.js` - Data Layer

```javascript
// Example: Get all listings
async getAll() {
    const sql = 'SELECT * FROM listings ORDER BY created_at DESC';
    const [rows] = await pool.query(sql);
    return rows;
}
```

**Key Points:**
- Contains only database queries
- Returns Promises for async operations
- Uses parameterized queries to prevent SQL injection

#### 3. `controllers/listingController.js` - Business Logic

```javascript
async index(req, res) {
    const listings = await ListingModel.getAll();
    res.render('index', { listings });
}
```

**Key Points:**
- Handles requests and responses
- Calls model methods for data
- Renders views or returns JSON

#### 4. `routes/listingRoutes.js` - URL Mapping

```javascript
router.get('/', ListingController.index);
router.post('/listings', ListingController.create);
```

**Key Points:**
- Maps URLs to controller functions
- Supports different HTTP methods
- Defines route parameters

#### 5. `views/*.ejs` - Templates

```html
<% listings.forEach(function(listing) { %>
    <div class="listing-card">
        <h3><%= listing.title %></h3>
    </div>
<% }); %>
```

**Key Points:**
- EJS syntax for dynamic content
- `<%= %>` outputs escaped content
- `<% %>` executes JavaScript

### Request Flow Example

1. User visits `/listings/1`
2. Route matches `GET /listings/:id`
3. Controller `show()` is called
4. Model `getById(1)` queries database
5. Database returns listing data
6. Controller renders `show.ejs` with data
7. User sees listing details page

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot connect to database"

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solutions:**
- Ensure MySQL server is running
- Check credentials in `.env` file
- Verify MySQL port (default: 3306)

**For XAMPP:**
```
Open XAMPP Control Panel → Start MySQL
```

**For MySQL Service:**
```bash
# Windows
net start mysql

# macOS (Homebrew)
brew services start mysql

# Linux
sudo systemctl start mysql
```

#### 2. "Unknown database 'listing_app'"

**Solution:**
Run the SQL script to create the database:
```bash
mysql -u root -p < database.sql
```

#### 3. "Access denied for user 'root'"

**Solutions:**
- Check password in `.env` file
- Reset MySQL root password
- For XAMPP: password might be empty

#### 4. "Port 3000 already in use"

**Solutions:**
- Change PORT in `.env` file
- Kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

#### 5. "Cannot find module"

**Solution:**
Install dependencies:
```bash
npm install
```

#### 6. EJS Template Not Found

**Error:**
```
Error: Failed to lookup view "index"
```

**Solution:**
- Ensure files exist in `views/` folder
- Check file extensions are `.ejs`
- Verify `app.set('views', ...)` path

### Getting Help

1. Check the console for error messages
2. Verify all files are in correct locations
3. Ensure MySQL is running
4. Check `.env` configuration
5. Try restarting the server

---

## 📝 License

MIT License - Feel free to use and modify for learning purposes.

---

## 🙏 Credits

Built as a beginner-friendly tutorial project demonstrating:
- Node.js & Express.js fundamentals
- MySQL database integration
- MVC architecture pattern
- RESTful API design
- EJS templating

Happy Coding! 🚀
