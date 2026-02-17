============================================================================
REALTIME CHAT APPLICATION - PROJECT DOCUMENTATION
============================================================================
TABLE OF CONTENTS
Project Overview
Technology Stack
Features List (FULL)
Folder Structure Explanation
System Architecture
DFD (Data Flow Diagram) Explanation
ERD (Entity Relationship Diagram) Explanation
Security Architecture
Authentication Flow (JWT + Socket.IO)
Application Flow (Stepwise)
Backend Internal Flow
Frontend Internal Flow
Auto API Documentation
Dependencies Installation
Environment Variables
How To Run Project
Runtime Flow (After Startup)
Common Errors & Fixes
Developer Notes
============================================================================
1. PROJECT OVERVIEW
============================================================================
Project Name
Realtime Chat Application

Purpose
A full-stack realtime messaging platform that enables users to connect with others, send text and image messages instantly, and see online status updates. The application features a modern UI with theme customization and secure authentication.

High-Level System Summary
This is a MERN Stack (MongoDB, Express, React, Node.js) application enhanced with Socket.IO for realtime capabilities.

Realtime Messaging: Instant message delivery and updates.
Online Status: Real-time visibility of online users.
Secure Auth: JWT-based authentication with HTTP-only cookies.
Media Support: Image uploads via Cloudinary.
Theming: Multiple color themes supported via DaisyUI.
Business Problem Solved
Facilitates instant, secure communication between users.
Provides a user-friendly interface with customizable aesthetics.
scalable solution for personal or team communication needs.
============================================================================
2. TECHNOLOGY STACK
============================================================================
Frontend
Category	Technology
Framework	React 19 + Vite
Language	JavaScript (ES6+)
State Management	Zustand
Routing	React Router DOM v7
UI Framework	Tailwind CSS + DaisyUI
Realtime Client	Socket.IO Client
HTTP Client	Axios
Icons	Lucide React
Notifications	React Hot Toast
Frontend Dependencies (Key)
json
{
  "react": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "zustand": "^5.0.5",
  "socket.io-client": "^4.8.1",
  "axios": "^1.10.0",
  "tailwindcss": "^3.4.17",
  "daisyui": "^3.9.4",
  "lucide-react": "^0.516.0",
  "react-hot-toast": "^2.5.2"
}
Backend
Category	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB (Mongoose ODM)
Realtime Server	Socket.IO
Authentication	JWT (JSON Web Token)
Password Hashing	Bcryptjs
Image Storage	Cloudinary
Security	Cookie Parser, Cors
Backend Dependencies (Key)
json
{
  "express": "^4.18.2",
  "mongoose": "^8.15.2",
  "socket.io": "^4.8.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cookie-parser": "^1.4.7",
  "cloudinary": "^2.6.1",
  "dotenv": "^16.5.0",
  "cors": "^2.8.5"
}
============================================================================
3. FEATURES LIST (FULL)
============================================================================
Authentication Features
 Secure User Signup
 User Login with secure credentials
 Persistent session (Auto-login on refresh)
 Profile Picture Upload & Update
Messaging Features
 Real-time text messaging
 Real-time image sharing
 View chat history
 Sidebar with list of available users
 Real-time "Online" status indicator
UI/UX Features
 Responsive Design (Mobile & Desktop)
 Theme Switching (Multiple themes via DaisyUI)
 Loading Skeletons for better UX
 Toast Notifications for actions
============================================================================
4. FOLDER STRUCTURE EXPLANATION
============================================================================
Backend Structure (backend/src)
backend/src/
├── controllers/
│   ├── auth.controller.js    # Logic for signup, login, logout, profile update
│   └── message.controller.js # Logic for fetching users, messages, sending messages
├── lib/
│   ├── cloudinary.js         # Cloudinary configuration
│   ├── db.js                 # MongoDB connection logic
│   ├── socket.js             # Socket.IO server setup
│   └── utils.js              # Utility functions (e.g., JWT token generation)
├── middleware/
│   └── auth.middleware.js    # Protects routes by verifying JWT
├── models/
│   ├── message.model.js      # Mongoose schema for messages
│   └── user.model.js         # Mongoose schema for users
├── routes/
│   ├── auth.route.js         # API routes for authentication
│   └── message.route.js      # API routes for messaging
└── index.js                  # Main server entry point
Frontend Structure (frontend/src)
frontend/src/
├── components/
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Sidebar.jsx           # User list sidebar
│   ├── ChatContainer.jsx     # Main chat area
│   ├── MessageInput.jsx      # Input for text/images
│   └── ...                   # UI components (Skeletons, Headers)
├── lib/
│   └── axios.js              # Configured Axios instance with interceptors
├── pages/
│   ├── HomePage.jsx          # Dashboard with chat interface
│   ├── LoginPage.jsx         # Login form
│   ├── SignupPage.jsx        # Registration form
│   ├── ProfilePage.jsx       # User profile details
│   └── SettingPage.jsx       # Theme selection
├── store/
│   ├── useAuthStore.js       # Global auth state & actions
│   ├── useChatStore.js       # Chat state (messages, users)
│   └── useThemesStore.js     # Theme preference state
├── App.jsx                   # Main Routes & Layout
└── main.jsx                  # React Entry Point
============================================================================
5. SYSTEM ARCHITECTURE
============================================================================
Client-Server Architecture
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (FRONTEND)                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React Application (Vite)                                       │   │
│  │  ├── Zustand Stores (Auth, Chat)                               │   │
│  │  ├── React Router (Navigation)                                 │   │
│  │  ├── Socket.IO Client (Realtime)                               │   │
│  │  └── Axios (REST API)                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────▲───────────────────────┘
                                 │ HTTPS (JSON)   │ WebSocket (Events)
                                 ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVER (BACKEND)                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Node.js / Express Server                                       │   │
│  │  ├── REST API Routes (Auth, Messages)                          │   │
│  │  ├── Socket.IO Server (Connection, Events)                     │   │
│  │  └── Middleware (Auth)                                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   MongoDB       │   │   Cloudinary    │   │   Socket Clients│
│   (Database)    │   │   (Images)      │   │   (Peers)       │
└─────────────────┘   └─────────────────┘   └─────────────────┘
Request Lifecycle
User Action: User sends a message.
API Call: Frontend sends POST request via Axios.
Processing: Backend validates token, parses request, saves to DB.
Real-time Event: Server emits newMessage via Socket.IO.
UI Update: Receiver's client listens and updates state instantly.
============================================================================
6. DFD (DATA FLOW DIAGRAM) EXPLANATION
============================================================================
Level 0 - Context Diagram
┌───────────┐                 ┌──────────────────┐
      │           │    Login/Msgs   │                  │
      │   USER    │◄───────────────►│  CHAT APPLICATION│
      │           │    Updates      │                  │
      └───────────┘                 └────────┬─────────┘
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       │                     │                     │
                       ▼                     ▼                     ▼
               ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
               │   MONGODB    │      │  CLOUDINARY  │      │  SOCKET.IO   │
               │  (Data Store)│      │ (Media Store)│      │  (Realtime)  │
               └──────────────┘      └──────────────┘      └──────────────┘
Level 1 - Messaging Flow
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  USER   │────►│ MESSAGE API  │────►│ CONTROLLER  │────►│   DATABASE   │
│ Sender  │     │ POST /send   │     │             │     │              │
└─────────┘     └──────────────┘     └──────┬──────┘     └──────────────┘
                                            │
                                            │ (Emit Event)
                                            ▼
                                     ┌─────────────┐     ┌──────────────┐
                                     │  SOCKET.IO  │────►│     USER     │
                                     │   SERVER    │     │   Receiver   │
                                     └─────────────┘     └──────────────┘
============================================================================
7. ERD (ENTITY RELATIONSHIP DIAGRAM) EXPLANATION
============================================================================
Entities
1. User Entity
Field	Type	Description
_id	ObjectId	Unique identifier
email	String	User email (Required, Unique)
fullName	String	User display name
password	String	Hashed password
profilePic	String	URL to Cloudinary image
createdAt	Date	Timestamp
2. Message Entity
Field	Type	Description
_id	ObjectId	Unique identifier
senderId	ObjectId	Reference to User (Sender)
receiverId	ObjectId	Reference to User (Receiver)
text	String	Message content
image	String	URL to Cloudinary image
createdAt	Date	Timestamp
Relationships
User ↔ Message: Many-to-Many via senderId and receiverId.
============================================================================
8. SECURITY ARCHITECTURE
============================================================================
Authentication Mechanism
JWT (JSON Web Token): Used for stateless authentication.
Payload: Contains userid.
Encryption: Signed with JWT_SECRET.
Authorization
HttpOnly Cookies: JWT stored in jwt cookie to prevent XSS.
Middleware (protectRoute): Verifies token on protected routes.
CORS: Strict origin whitelist for frontend.
Password Security
Bcryptjs: Passwords hashed with salt (10 rounds).
============================================================================
9. AUTHENTICATION FLOW (JWT + SOCKET.IO)
============================================================================
1. Login Request
User submits email/password -> Backend verifies hash -> Generates JWT.

2. Token Storage
Backend sets jwt cookie (HttpOnly, Secure, SameSite).

3. Protected Request
Frontend sends request -> Cookie auto-sent -> protectRoute verifies JWT signature.

4. Socket Connection
Frontend connects Socket.IO with userId. Server maps userId -> socketId.

============================================================================
10. APPLICATION FLOW (STEPWISE)
============================================================================
1. Startup
Backend: Connects to DB, starts Express (5001), starts Socket.IO.
Frontend: Loads React, runs checkAuth() API call.
2. Dashboard
If authenticated, redirects to Homepage.
Socket connects automatically.
Fetches active users via Socket event getOnlineUsers.
3. Messaging
User selects contact -> getMessages API fetch history.
User sends message -> sendMessage API (POST).
Backend saves message -> Emits newMessage via Socket.
Receiver gets update via useChatStore.
============================================================================
11. BACKEND INTERNAL FLOW
============================================================================
Request (POST /api/messages/send/:id)
    ↓
server.js (App)
    ↓
message.route.js
    ↓
protectRoute Middleware (Verifies JWT)
    ↓
message.controller.sendMessage
    ↓
    ├── Validate Body
    ├── Upload Image (Cloudinary)
    ├── Create Message (MongoDB)
    └── Emit Socket Event (io.to(socketId).emit)
    ↓
Response (201 Created)
============================================================================
12. FRONTEND INTERNAL FLOW
============================================================================
App.jsx (Router)
    ↓
Route / (HomePage)
    ↓
ChatContainer.jsx (Components)
    ↓
useChatStore (Zustand)
    ↓
sendMessage Action (Axios)
    ↓
Handle Response & Update Messages Array
============================================================================
13. AUTO API DOCUMENTATION
============================================================================
API Endpoints Overview
Method	Endpoint	Description	Auth Required	Request Body	Response
POST	/api/auth/signup	Register user	No	fullName, email, password	User Object
POST	/api/auth/login	Login user	No	email, password	User Object
POST	/api/auth/logout	Logout user	No	-	Success Message
GET	/api/auth/check	Verify session	Yes	-	User Object
GET	/api/messages/users	Get sidebar users	Yes	-	List of Users
GET	/api/messages/:id	Get chat history	Yes	-	List of Messages
POST	/api/messages/send/:id	Send message	Yes	text, image	Message Object
Detailed Endpoint Reference
POST /api/auth/signup
Purpose: Creates a new user account.
Auth: No.
Request:
json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response (201):
json
{
  "_id": "65d...",
  "fullName": "John Doe",
  "email": "john@example.com"
}
POST /api/auth/login
Purpose: Authenticates user and sets session cookie.
Auth: No.
Request:
json
{
  "email": "john@example.com",
  "password": "password123"
}
Response (200):
json
{
  "_id": "65d...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "..."
}
GET /api/messages/:id
Purpose: Retrieves chat history between current user and target user (:id).
Auth: Yes.
Response (200):
json
[
  {
    "_id": "msg_1...",
    "senderId": "my_id",
    "receiverId": "target_id",
    "text": "Hello!",
    "createdAt": "..."
  }
]
POST /api/messages/send/:id
Purpose: Sends a text or image message to target user (:id).
Auth: Yes.
Request:
json
{
  "text": "Hello there!",
  "image": "data:image/png;base64,..." // Optional
}
Response (201):
json
{
  "_id": "msg_2...",
  "senderId": "my_id",
  "receiverId": "target_id",
  "text": "Hello there!",
  "image": "https://res.cloudinary.com/...",
  "createdAt": "..."
}
============================================================================
14. DEPENDENCIES INSTALLATION
============================================================================
Backend Setup
Navigate to Backend

bash
cd backend
Install Packages

bash
npm install
Important Dependencies:

express: Web Server
mongoose: Database
jsonwebtoken: Authentication
socket.io: Real-time
cloudinary: Image Storage
Start Server

bash
npm run dev    # Development
Frontend Setup
Navigate to Frontend

bash
cd frontend
Install Packages

bash
npm install
Important Dependencies:

react, react-dom
socket.io-client: Real-time Client
zustand: State Management
axios: API Client
Start Dev Server

bash
npm run dev
============================================================================
15. ENVIRONMENT VARIABLES
============================================================================
Backend (backend/.env)
Variable	Description	Required	Example
PORT	Server Port	No	5001
MONGODB_URI	MongoDB Connection String	Yes	mongodb+srv://...
JWT_SECRET	Secret for Token Signing	Yes	secret123
CLOUDINARY_CLOUD_NAME	Cloudinary Config	Yes	dx...
CLOUDINARY_API_KEY	Cloudinary Config	Yes	123...
CLOUDINARY_API_SECRET	Cloudinary Config	Yes	abc...
NODE_ENV	Environment Mode	No	development
============================================================================
16. HOW TO RUN PROJECT
============================================================================
Step 1: Configure Environment
Ensure backend/.env is created with the keys listed above.

Step 2: Start Backend
bash
cd backend
npm run dev
# Server should run on http://localhost:5001
Step 3: Start Frontend
bash
cd frontend
npm run dev
# Vite server runs on http://localhost:5173
Step 4: Verify
Open http://localhost:5173, create an account, and start chatting.

============================================================================
17. RUNTIME FLOW (AFTER STARTUP)
============================================================================
Idle State: Server listens on Port 5001.
User Connects: Frontend checks /api/auth/check for active session.
Socket Init: Once authenticated, client connects to Socket.IO.
Active Users: Sidebar updates via getOnlineUsers event.
Messaging: Messages flow via HTTP (save) + Socket (deliver).
============================================================================
18. COMMON ERRORS & FIXES
============================================================================
Error: "MongoDB Connection Error"
Fix: Check MONGODB_URI in .env and IP Whitelist in MongoDB Atlas.

Error: "CORS Policy Blocked"
Fix: Ensure origin in index.js matches your frontend URL (http://localhost:5173).

Error: "Socket Not Connected"
Fix: Ensure socket.io-client points to backend URL (http://localhost:5001).

============================================================================
19. DEVELOPER NOTES
============================================================================
Scalability Improvements
Redis Adapter: Use Redis for Socket.IO multi-server scaling.
Pagination: Implement cursor-based pagination for messages.
Security Improvements
Rate Limiting: Add limiters to prevent API abuse.
Input Validation: Use zod or express-validator.
Performance
Image Optimization: Resize images client-side before upload to save bandwidth.
Virtualization: Use react-window for large message lists.
============================================================================
END OF DOCUMENTATION
============================================================================
