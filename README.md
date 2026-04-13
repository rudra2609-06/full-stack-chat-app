# 💬 ChatApp - Real-Time Messaging Platform

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A **production-ready, full-stack real-time messaging application** with instant notifications, image sharing, and user presence detection. Built with modern web technologies for scalability and performance.

[Live Demo](https://full-stack-chat-app-vp1v.onrender.com/) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#-architecture)
- [📁 Folder Structure](#-folder-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Environment Setup](#-environment-setup)
- [🚀 Installation & Setup](#-installation--setup)
- [📡 API Endpoints](#-api-endpoints)
- [🔌 Real-Time Communication](#-real-time-communication)
- [📸 Screenshots](#-screenshots)
- [💡 Technical Highlights](#-technical-highlights)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

ChatApp is a modern, full-featured real-time messaging platform that demonstrates advanced web development concepts. It combines secure authentication, real-time bidirectional communication via WebSockets, and a responsive user interface to deliver a seamless chat experience.

**Perfect for:** Demonstrating full-stack development expertise, system design knowledge, and modern JavaScript proficiency to recruiters and senior developers.

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ JWT-based authentication with secure token storage
- ✅ Password hashing with bcrypt
- ✅ Protected routes and API endpoints
- ✅ Secure cookie-based session management
- ✅ CORS configuration for production safety

### 💬 Messaging Features
- ✅ **Real-time messaging** with Socket.IO WebSocket connection
- ✅ Message persistence in MongoDB
- ✅ Image upload and sharing via Cloudinary integration
- ✅ Instant delivery without page refresh
- ✅ Beautiful message UI with sender/receiver distinction

### 👥 User Management
- ✅ User registration and profile creation
- ✅ Profile picture updates
- ✅ Online/Offline user status tracking
- ✅ User discovery and contact list
- ✅ User presence indication with live status

### 🎨 User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications for actions and errors
- ✅ Auto-scroll to latest messages
- ✅ Loading skeletons for better UX
- ✅ Dark/Light theme support
- ✅ Smooth animations and transitions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components │ Pages │ Store (Zustand) │ Hooks │ Utils  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                    Axios + Socket.IO                         │
│                           │                                  │
└─────────────────────────────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
         REST API      WebSocket      (Real-time)
              │              │              │
┌─────────────────────────────────────────────────────────────┐
│                 SERVER (Node.js + Express)                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Routes │ Controllers │ Middleware │ Models │ Utils │   │ │
│  │         Socket.IO Server (Event Handlers)              │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                    MongoDB + Cloudinary                      │
│                           │                                  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Authentication**: Client sends credentials → Server validates & issues JWT → Stored in cookies
2. **HTTP Requests**: React components → Axios interceptor adds JWT → Express middleware validates
3. **Real-time Messages**: React state → Socket.IO emit → Server broadcast → All clients receive
4. **User Updates**: Database change → Socket.IO event → UI updates instantly

---

## 📁 Folder Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── MessageInput.jsx
│   │   ├── MessageSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── pages/               # Page-level components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── store/               # Zustand state management
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
│   │   └── useThemeStore.js
│   ├── lib/
│   │   └── apiInstance.js   # Axios configuration
│   ├── Routes/
│   │   └── AllRoutes.jsx    # Route definitions
│   ├── schemas/             # Validation schemas
│   ├── constants/           # App constants
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── controllers/         # Business logic
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   └── message.route.js
│   ├── models/              # Mongoose schemas
│   │   ├── user.model.js
│   │   └── message.model.js
│   ├── middlewares/         # Express middleware
│   │   └── auth.middleware.js
│   ├── lib/                 # Utilities
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── utils.js
│   ├── seeds/               # Database seeding
│   │   └── user.seed.js
│   └── index.js             # Server entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── bun.lock or package-lock.json
```

---

## 🛠️ Tech Stack

### Frontend Stack
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | ^18.x |
| **Vite** | Build tool & dev server | ^5.x |
| **Zustand** | State management | ^4.x |
| **Socket.IO Client** | Real-time communication | ^4.x |
| **Axios** | HTTP client | ^1.x |
| **Tailwind CSS** | Utility CSS framework | ^3.x |
| **DaisyUI** | Component library | ^4.x |
| **React Router** | Client-side routing | ^6.x |
| **React Hot Toast** | Toast notifications | ^2.x |

### Backend Stack
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime | ^18.x or ^20.x |
| **Express.js** | Web framework | ^4.x |
| **Socket.IO** | WebSocket library | ^4.x |
| **MongoDB** | NoSQL database | Cloud or Local |
| **Mongoose** | MongoDB ODM | ^8.x |
| **JWT (jsonwebtoken)** | Authentication | ^9.x |
| **Bcrypt** | Password hashing | ^5.x |
| **Cloudinary** | Image hosting | SDK |
| **Dotenv** | Environment variables | ^16.x |
| **CORS** | Cross-origin requests | ^2.x |

---

## ⚙️ Environment Setup

### Frontend Environment Variables
Create a `.env.local` file in the `/frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5001/api

# Socket.IO Configuration
VITE_SOCKET_URL=http://localhost:5001
```

### Backend Environment Variables
Create a `.env` file in the `/backend` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend URL (for CORS)
REACT_FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=<appName>

# Authentication
JWT_SECRET=your-very-secure-jwt-secret-key-here-min-32-chars

# Cloudinary Configuration (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**⚠️ Important:** Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v18+ or **Bun** runtime
- **MongoDB** (local or Atlas cloud)
- **Git** for version control
- A **Cloudinary** account for image uploads

### Step 1️⃣: Clone the Repository
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

### Step 2️⃣: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# or
bun install

# Create .env file with variables from "Environment Setup" section above
# Make sure MongoDB URI and Cloudinary credentials are added

# Seed the database with sample users (optional)
node src/seeds/user.seed.js

# Start the backend server
npm run dev
# Server runs on http://localhost:5001
```

### Step 3️⃣: Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
bun install

# Create .env.local file with variables from "Environment Setup" section

# Start the development server
npm run dev
# App runs on http://localhost:5173
```

### Step 4️⃣: Access the Application
- Open your browser and navigate to **http://localhost:5173**
- Sign up with a new account or use seeded credentials
- Start chatting! 🎉

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `POST` | `/api/auth/signup` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update user profile (pic) | ✅ |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| `GET` | `/api/message/user` | Get all users for sidebar | ✅ |
| `GET` | `/api/message/:id` | Get messages with user ID | ✅ |
| `POST` | `/api/message/send/:id` | Send message to user ID | ✅ |

### Request/Response Examples

#### Sign Up
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Send Message
```bash
POST /api/message/send/userId
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "text": "Hello there!",
  "image": "data:image/png;base64,..." // optional
}
```

---

## 🔌 Real-Time Communication with Socket.IO

### Socket Events

#### Client → Server Events
```javascript
// Emit user online status
socket.emit("userOnline", { userId });

// Send real-time message
socket.emit("sendMessage", { 
  receiverId, 
  text, 
  image 
});
```

#### Server → Client Events
```javascript
// Receive user online status updates
socket.on("userOnline", (userId) => {
  // Update UI to show user is online
});

// Receive real-time messages
socket.on("receiveMessage", (message) => {
  // Add message to chat UI instantly
});

// User/Users came online
socket.on("usersOnline", (onlineUserIds) => {
  // Update online status for each user
});
```

### Socket.IO Implementation Details

1. **Connection**: When user logs in, Socket.IO client connects to server
2. **Authentication**: Server validates JWT from connect handshake
3. **Join Rooms**: User joins a room with their ID for targeted messaging
4. **Message Broadcasting**: Messages broadcast to relevant user rooms
5. **Presence Tracking**: Server maintains list of connected users
6. **Reconnection**: Auto-reconnect with exponential backoff on disconnect

```javascript
// Backend Socket Handler Example
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  
  // Add to online users
  onlineUsers.add(userId);
  io.emit("usersOnline", Array.from(onlineUsers));
  
  // Handle incoming messages
  socket.on("sendMessage", async (data) => {
    // Save to database
    // Emit to receiver
    io.to(data.receiverId).emit("receiveMessage", savedMessage);
  });
  
  // Handle disconnect
  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("usersOnline", Array.from(onlineUsers));
  });
});
```

---

## 📸 Screenshots

### Login Page
<img width="1866" height="927" alt="Screenshot (327)" src="https://github.com/user-attachments/assets/56ee23d5-26e9-4adf-a261-30f6c739e556" />

*Clean, modern login interface with form validation and error handling*

### Chat Interface
<img width="1864" height="952" alt="image" src="https://github.com/user-attachments/assets/054573a1-66d4-4cd9-b180-8399f2c1d567" />

*Real-time messaging with message bubbles, user avatars, and online status*

### Profile Settings
<img width="1873" height="933" alt="image" src="https://github.com/user-attachments/assets/e29d73ef-4daa-4cfb-abed-c709080fc91f" />

*Update profile picture and user information*

---

## 💡 Technical Highlights

### 1. **Real-Time Architecture**
- Implemented bidirectional WebSocket communication using Socket.IO
- Handles presence detection with fallback mechanisms
- Efficient room-based broadcasting to specific users

### 2. **State Management**
- Custom Zustand stores for auth, chat, and theme
- Optimistic UI updates for messages
- Synchronization between browser tabs via localStorage

### 3. **Security Best Practices**
- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt (salt rounds: 10)
- Protected API routes with authentication middleware
- CORS configuration to prevent unauthorized access
- Environment variables for sensitive data

### 4. **Database Design**
```javascript
// User Schema
{
  name, email, password, profilePic, createdAt, updatedAt
}

// Message Schema
{
  senderId, receiverId, text, image, createdAt, updatedAt
}
```
- Efficient indexing on senderId, receiverId for fast queries
- Compound indexes for message retrieval

### 5. **Frontend Optimization**
- Code splitting with React.lazy and dynamic imports
- Component-level error boundaries
- Memoization of expensive computations
- Skeleton loaders for perceived performance
- Auto-scroll implementation with refs

### 6. **Image Upload Pipeline**
1. Client converts image to Base64
2. Sends to backend via API
3. Backend uploads to Cloudinary
4. Returns secure URL
5. Stored in MongoDB
6. Displayed in chat UI

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Test new features locally
- Maintain backward compatibility
- Update documentation for new features
- Keep commit messages descriptive

---

## 📄 License

This project is licensed under the MIT License - see below:

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

<div align="center">

### ⭐ If you found this helpful, please give it a star!

**Built with ❤️ by [Rudra Thakkar](https://github.com/rudra2609-06)**

[⬆ Back to Top](#-chatapp---real-time-messaging-platform)

</div>
