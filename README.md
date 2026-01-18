# Blog Management App

A full-stack blog management system where users can register, log in, and create rich-text blog posts. Authenticated users can manage (create, edit, delete) their own posts, while all users (including guests) can view posts. Built with Node.js/Express, MongoDB, React, and Tailwind CSS.

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB Atlas 
- npm 

---

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend

npm install
```

2. Create a `.env` file in the backend folder and add the following environment variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend

npm install
```

2. Start the frontend development server:

```bash
npm run dev
```

3. Open your browser and go to `http://localhost:3000` to see the app in action.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  

---

## API Documentation

### Authentication
- **POST** `/api/auth/register` - Register a new user  
- **POST** `/api/auth/login` - Log in a user  

### Posts
- **GET** `/api/posts` - Retrieve all posts  
- **GET** `/api/posts/:id` - Retrieve a single post  
- **POST** `/api/posts` - Create a new post  
- **PUT** `/api/posts/:id` - Update a post  
- **DELETE** `/api/posts/:id` - Delete a post  

---

## Brief Architecture Explanation

The application follows a typical full-stack architecture with a React frontend communicating with a Node.js/Express backend. The backend handles API requests and interacts with a MongoDB database to store user and post data. The frontend is built using React and Vite for a fast development experience, while Tailwind CSS is used for styling.

---

## Postman Collection or cURL Commands

### cURL Commands

```bash

curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"testuser", "password":"testpass"}'


curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"testuser", "password":"testpass"}'


curl -X POST http://localhost:5000/api/posts -H "Content-Type: application/json" -d '{"title":"My First Post", "content":"This is the content of my first post."}'
```

