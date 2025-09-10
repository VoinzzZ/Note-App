# 📝 Note App

A Simple full-stack note-taking application built with **React.js** frontend and **Node.js/Express** backend, using **MongoDB** as the database.

## ✨ Features

- 🔐 **User Authentication** - Register, Login, and JWT-based authentication
- 📝 **CRUD Operations** - Create, Read, Update, Delete notes
- 📌 **Pin Notes** - Pin important notes to the top
- 🔍 **Search Functionality** - Search notes by title or content
- 🏷️ **Tags Support** - Organize notes with tags
- 🔒 **Secure** - User-specific notes with proper authorization

## 🚀 Tech Stack

### Environment Variables for Production

**Backend (.env):**
```env
ACCESS_TOKEN_SECRET=your_secret_here
PORT=8000
MONGODB_URI=your_mongodb_uri_here
```

**Frontend (if needed):**
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## 🧪 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts  
```bash
npm start        # Start server with nodemon
npm test         # Run tests (not implemented yet)
```

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB for the flexible database
- Tailwind CSS for the utility-first styling
- Vite for the fast build toold
- **React.js** - UI Framework
- **Axios** - HTTP Client
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **React Icons** - Icons

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **dotenv** - Environment Variables

## 📁 Project Structure

```
Note-App/
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── utils/                 # Utility functions
│   │   └── App.js                 # Main app component
│   ├── public/
│   └── package.json
│
├── backend/                        # Node.js backend
│   ├── app/
│   │   ├── controllers/         # Route controllers
│   │   ├── middlewares/         # Custom middlewares
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API routes
│   │   └── utils/                # Utility functions
│   |   ├── config/
│   │         └── db.mongo.js     # Database configuration
│   ├── app.js                    # Express app setup
│   ├── index.js                  # Server entry point
│   └── package.json
│
├── .env                     # Environment variables
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Note-App.git
cd Note-App
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend root:
```env
ACCESS_TOKEN_SECRET=your_secret_here
PORT=8000
MONGODB_URI=your_mongodb_uri_here
```

Start backend server:
```bash
npm run dev
# or
npm start
```
Backend will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/create-account` | Register new user | `{ fullName, email, password }` |
| POST | `/api/auth/login` | Login user | `{ email, password }` |
| GET | `/api/auth/get-user` | Get current user | Headers: `Authorization: Bearer <token>` |

### Notes Endpoints

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| POST | `/api/notes/add-note` | Create new note | `{ title, content, tags }` | ✅ |
| GET | `/api/notes/get-all-notes` | Get all user notes | - | ✅ |
| PUT | `/api/notes/edit-note/:noteId` | Update note | `{ title, content, tags, isPinned }` | ✅ |
| DELETE | `/api/notes/delete-note/:noteId` | Delete note | - | ✅ |
| PUT | `/api/notes/update-note-pinned/:id` | Toggle pin status | `{ isPinned }` | ✅ |
| GET | `/api/notes/search-notes?query=keyword` | Search notes | Query params | ✅ |

### Response Format

**Success Response:**
```json
{
  "error": false,
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": true,
  "message": "Error message"
}
```

## 🔒 Authentication

The app uses **JWT (JSON Web Tokens)** for authentication. After login, the token must be included in the request headers:

```javascript
Headers: {
  "Authorization": "Bearer <your-jwt-token>"
}
```

## 🗃️ Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required),
  createdOn: Date (default: now)
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  tags: [String] (default: []),
  isPinned: Boolean (default: false),
  userId: String (required),
  createdOn: Date (default: now)
}
```
