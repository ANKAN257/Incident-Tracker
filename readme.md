# Incident Tracker Mini App
- A full-stack application to create, browse, filter, and manage production incidents.
- This project demonstrates backend API design, MongoDB indexing, server-side pagination, and clean architectural separation.

# Overview
- 

# Tech Stack
# 1. Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database 
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication via HTTP-only cookies
- **ZOD**: Request validation
- **bcrypt**: Password hashing
- **express-mongo-sanitize**: NoSQL injection protection

# 2. Frontend
- **React (Vite)**: UI framework
- **Tailwind**: Styling
- **AXIOS**: HTTP requests


# 3. Getting Started
**Prerequisites**
- Node.js v18+
- MongoDB running locally or MongoDB Atlas URI
- npm

# 4. Backend Setup
1. Navigate to backend:
- cd backend
2. Install dependencies:
- npm install
3.  Create .env file:
- PORT=5000
- mongo_url=mongodb://localhost:27017/incident-tracker
- JWT_SECRET_KEY=your_jwt_secret_key
4. Run the server:
- npm run dev

# 5. Frontend Setup
1. Navigate to frontend:
- cd frontend
2. Install dependencies:
- npm install
3. Run the app:
- npm run dev

# 6. API Endpoints
1. **AUTH**
- POST   /api/auth/register  - Register new user
- POST   /api/auth/login     - Login and set cookie
- /api/auth/logout           - Logout and clear cookie
2. **Incidents**
- POST    /api/incidents     - Create new incident
- GET     /api/incidents     - Get all incidents 
- GET     /api/incidents/:id - Get incident by publicId (UUID) as know as external ID
- PATCH   /api/incidents/:id - Update incident

# 7.  Seed Database
- Populate the database with 20 sample users(admin+user):
- Populate the database with 200 sample incidents:

# 8. Scripts
- npm run dev - Start server with nodemon
- npm start   - Start server in production
- npm run seed - Seed database with some records