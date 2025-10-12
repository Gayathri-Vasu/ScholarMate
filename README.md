# Tamil Nadu Learning Hub

A comprehensive full-stack learning platform built with React, Node.js, and MongoDB. This educational platform serves students across Tamil Nadu with courses ranging from school curriculum to competitive exams and professional development.

## 🏗️ Project Structure

```
tamilnadu-learn-spark/
├── frontend/                 # React frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── ...                 # Frontend config files
├── backend/                # Node.js backend API
│   ├── models/             # MongoDB models
│   ├── routes/             # API route handlers
│   ├── scripts/            # Database scripts
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── package.json            # Workspace configuration
├── .env                    # Environment variables (root level)
├── tsconfig.json           # TypeScript workspace config
├── eslint.config.js        # ESLint configuration
└── .gitignore             # Git ignore rules
```

## 🚀 How to Run This Project

### Prerequisites
Before running the project, make sure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either local installation or MongoDB Atlas account
- **Git** (if cloning the repository)

### Step 1: Install Dependencies

```bash
# Install all dependencies for the workspace
npm run install:all
```

This will install dependencies for:
- Root workspace
- Frontend (React + Vite)
- Backend (Node.js + Express)

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```bash
# Create the .env file
echo "# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tn-learning-hub
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/tn-learning-hub

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:8080

# API Configuration
API_VERSION=v1

# Frontend Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Tamil Nadu Learning Hub
VITE_NODE_ENV=development" > .env
```

Or manually create a `.env` file with the above content.

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. The default connection string `mongodb://localhost:27017/tn-learning-hub` will work

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### Step 4: Seed the Database

```bash
# Populate the database with sample data
npm run seed
```

This will create:
- 4 Categories (TN Board, TNPSC, Engineering, IT Placement)
- 25+ Subjects across all categories
- 17+ Comprehensive courses with detailed content

### Step 5: Start the Application

**Option A: Start Both Frontend and Backend Together**
```bash
npm run dev
```
This will start:
- Frontend on http://localhost:8080
- Backend API on http://localhost:5000

**Option B: Start Frontend and Backend Separately**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

### Step 6: Access the Application

Once running, you can access:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api/v1

### 🧪 Test the API

You can test the API endpoints:

```bash
# Get all categories
curl http://localhost:5000/api/v1/categories

# Get featured courses
curl http://localhost:5000/api/v1/courses/featured

# Search courses
curl "http://localhost:5000/api/v1/courses?search=mathematics"
```

### 🔧 Troubleshooting

**Common Issues:**

1. **MongoDB Connection Error**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   - Make sure MongoDB is running
   - Check your MONGODB_URI in .env file

2. **Port Already in Use**
   ```
   Error: listen EADDRINUSE :::5000
   ```
   - Change PORT in .env file
   - Kill existing processes using the port

3. **Module Not Found**
   ```
   Error: Cannot find module 'mongoose'
   ```
   - Run `npm run install:all` to install dependencies

4. **Environment Variables Not Loading**
   - Make sure .env file is in the root directory
   - Check that .env file has correct format (no spaces around =)

### 🎯 What You'll See

Once running, you'll have access to:
- **Course Categories**: TN Board, TNPSC, Engineering, IT Placement
- **Subjects**: Mathematics, Physics, Chemistry, Tamil, etc.
- **Courses**: 17+ comprehensive courses with videos, PDFs, and tests
- **Search & Filter**: Find courses by category, subject, or level
- **Responsive Design**: Works on desktop and mobile

### 🚀 Production Deployment

For production deployment:
1. Set `NODE_ENV=production` in .env
2. Use MongoDB Atlas for database
3. Build the frontend: `npm run build:frontend`
4. Deploy backend to your preferred hosting service

## 📋 Available Scripts

### Workspace Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all packages
- `npm run seed` - Seed database with sample data
- `npm run clean` - Clean all node_modules and build artifacts
- `npm run lint` - Run linting for all packages

### Frontend Scripts
- `npm run dev:frontend` - Start frontend development server
- `npm run build:frontend` - Build frontend for production
- `npm run lint:frontend` - Run frontend linting

### Backend Scripts
- `npm run dev:backend` - Start backend development server
- `npm run build:backend` - Build backend for production
- `npm run lint:backend` - Run backend linting
- `npm run seed:backend` - Seed backend database

### Quick Reference Table

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run dev` | Start both frontend and backend | Development |
| `npm run dev:frontend` | Start only frontend | Frontend development |
| `npm run dev:backend` | Start only backend | Backend development |
| `npm run build` | Build for production | Before deployment |
| `npm run seed` | Populate database with sample data | First time setup |
| `npm run install:all` | Install all dependencies | After cloning |
| `npm run clean` | Clean all node_modules | Troubleshooting |
| `npm run lint` | Run code linting | Code quality check |

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful UI components
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Compression** - Response compression

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tn-learning-hub
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/tn-learning-hub

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:8080

# API Configuration
API_VERSION=v1
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Tamil Nadu Learning Hub
VITE_NODE_ENV=development
```

## 📚 API Documentation

### Categories
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:slug` - Get category by slug
- `POST /api/v1/categories` - Create category (Admin)
- `PUT /api/v1/categories/:id` - Update category (Admin)
- `DELETE /api/v1/categories/:id` - Delete category (Admin)

### Subjects
- `GET /api/v1/subjects` - Get all subjects
- `GET /api/v1/subjects?categoryId=:id` - Get subjects by category
- `GET /api/v1/subjects?categorySlug=:slug` - Get subjects by category slug
- `GET /api/v1/subjects/:slug` - Get subject by slug

### Courses
- `GET /api/v1/courses` - Get all courses with filtering
- `GET /api/v1/courses/featured` - Get featured courses
- `GET /api/v1/courses/:slug` - Get course by slug
- `POST /api/v1/courses` - Create course (Admin)
- `PUT /api/v1/courses/:id` - Update course (Admin)
- `DELETE /api/v1/courses/:id` - Delete course (Admin)

### Query Parameters for Courses
- `search` - Search in title, description, and tags
- `category` - Filter by category slug
- `subject` - Filter by subject ID
- `level` - Filter by course level
- `page` - Page number for pagination
- `limit` - Number of items per page
- `sortBy` - Field to sort by
- `sortOrder` - Sort order (asc/desc)

## 🗄️ Database Schema

### Categories
- `name` - Category name
- `slug` - URL-friendly identifier
- `type` - Category type (TNBOARD, TNPSC, ENGINEERING, PLACEMENT)
- `icon` - Emoji or icon identifier
- `description` - Category description
- `sortOrder` - Display order

### Subjects
- `categoryId` - Reference to category
- `name` - Subject name
- `slug` - URL-friendly identifier
- `description` - Subject description
- `sortOrder` - Display order

### Courses
- `title` - Course title
- `slug` - URL-friendly identifier
- `description` - Course description
- `categoryId` - Reference to category
- `subjectId` - Reference to subject (optional)
- `level` - Course level
- `thumbnailUrl` - Course thumbnail image
- `rating` - Course rating (0-5)
- `enrollmentCount` - Number of enrolled students
- `tags` - Array of course tags
- `sections` - Course content sections
- `isPublished` - Publication status

## 🎯 Course Categories

### TN State Board (Classes 9-12)
- Mathematics, Physics, Chemistry, Biology
- Tamil Literature, English, Social Science
- Computer Science

### TNPSC Preparation
- Group I, Group II, Group IV, VAO, TET
- Current Affairs and General Studies

### Engineering
- CSE, IT, Electrical, Mechanical, Civil, Electronics
- Data Structures, DBMS, Circuit Analysis

### IT Placement
- Aptitude, Programming, System Design
- GenAI & Prompting, Soft Skills
- JavaScript, Database Management

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Configured for specific origins
- **Input Validation**: Mongoose schema validation
- **Error Handling**: No sensitive data in error responses

## 🚀 Deployment

### Environment Variables
Make sure to set these environment variables in production:
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (production)
- `FRONTEND_URL` - Your frontend URL for CORS

### MongoDB Atlas
For production, use MongoDB Atlas:
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your environment

## 🧪 Testing the API

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example requests:
```bash
# Get all categories
curl http://localhost:5000/api/v1/categories

# Get featured courses
curl http://localhost:5000/api/v1/courses/featured

# Search courses
curl "http://localhost:5000/api/v1/courses?search=mathematics&category=tnboard"
```

## 📖 Additional Documentation

- [Database Setup Guide](./DATABASE_SETUP.md) - Detailed database setup and seeding instructions
- [Perplexity API Setup](./PERPLEXITY_SETUP.md) - Configure AI-powered chatbot with Perplexity API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

BIT License - see LICENSE file for details