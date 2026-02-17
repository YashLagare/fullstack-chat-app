============================================================================
REALTIME CHAT APPLICATION - COMPREHENSIVE PROJECT DOCUMENTATION
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
JWT Auth Flow (Diagram Explanation)
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
Frontend Dependencies
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
Backend Dependencies
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
 User Signup with name, email, password
 User Login with secure credentials
 User Logout
 Persistent session (Auto-login on refresh)
 Profile Picture Upload & Update
Messaging Features
 Real-time text messaging
 Real-time image sharing
 View chat history with selected user
 Sidebar with list of available users
 Real-time "Online" status indicator
UI/UX Features
 Responsive Design (Mobile & Desktop)
 Theme Switching (Multiple themes via DaisyUI)
 Loading Skeletons for better UX
 Toast Notifications for actions (Login success, errors, etc.)
 Auto-scroll to latest message
============================================================================
4. FOLDER STRUCTURE EXPLANATION
============================================================================
Backend Structure (backend/src/)
backend/src/
├── controllers/
│   ├── auth.controller.js    # Logic for signup, login, logout, profile update
│   └── message.controller.js # Logic for fetching users, messages, sending messages
├── lib/
│   ├── cloudinary.js         # Cloudinary configuration
│   ├── db.js                 # MongoDB connection logic
│   ├── socket.js             # Socket.IO server setup & event handling
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
Frontend Structure (frontend/src/)
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
│  │  ├── Zustand Stores (Auth, Chat, Theme)                        │   │
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
User Action: User clicks "Send".
State Update: Frontend Optimistic update (optional) or loading state.
API Call: Axios posts message to backend.
Processing: Controller saves message to MongoDB.
Realtime Event: Socket.IO emits newMessage to receiver.
UI Update: Receiver's state updates instantly via Socket listener.
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
password	String	Hashed password (min 6 chars)
profilePic	String	URL to Cloudinary image
createdAt	Date	Account creation timestamp
updatedAt	Date	Last update timestamp
2. Message Entity
Field	Type	Description
_id	ObjectId	Unique identifier
senderId	ObjectId	Reference to User (Required)
receiverId	ObjectId	Reference to User (Required)
text	String	Message content (Optional if image exists)
image	String	URL to Cloudinary image (Optional)
createdAt	Date	Message timestamp
updatedAt	Date	Last update timestamp
Relationships
User ↔ Message (One-to-Many): A User can send many Messages.
User ↔ Message (One-to-Many): A User can receive many Messages.
Self-Referencing: Message links two Users (senderId and receiverId).
============================================================================
8. SECURITY ARCHITECTURE
============================================================================
Authentication Mechanism
JWT (JSON Web Token): Used for stateless authentication.
Payload: Contains userid.
Encryption: Signed with JWT_SECRET.
Authorization & Protection
HttpOnly Cookies: JWT is stored in an HTTP-only cookie (jwt) to prevent XSS attacks.
Middleware (protectRoute):
Intercepts requests to protected routes.
Verifies the token from the cookie.
Attaches req.user if valid.
Returns 401 if missing/invalid.
Password Security
Bcryptjs: Passwords are never stored in plain text.
Salting: Auto-generated salt (10 rounds) used before hashing.
CORS & Environment
CORS Config: Whitlelists frontend origin (http://localhost:5173).
Secure Cookies: Cookies set with secure: true in production (HTTPS) and sameSite: "strict"/"lax".
============================================================================
9. JWT AUTH FLOW (DIAGRAM EXPLANATION)
============================================================================
Step-by-Step Flow
Login Request: User sends Email + Password to /api/auth/login.
Validation: Server compares hashed password with DB.
Token Creation: Server generates JWT with userid, expires in 7 days.
Cookie Set: Server sets jwt cookie (HttpOnly) in response.
Client State: Frontend updates authUser state.
API Access: Subsequent requests (e.g., /api/messages/users) automatically include the cookie.
Verification: protectRoute middleware decodes token and allows access.
User -> Login API -> DB Validation -> JWT Generated -> Set Cookie (HttpOnly) -> Client
                                                                 │
                                                                 ▼
User -> Protected API (Cookie auto-sent) -> Middleware Verify -> Controller -> Response
Security Risks Handled
XSS: Mitigated by HttpOnly cookies (JS cannot read token).
CSRF: Mitigated by sameSite cookie attribute.
Man-in-the-Middle: Mitigated by HTTPS (in production).
============================================================================
10. APPLICATION FLOW (STEPWISE)
============================================================================
1. App Startup
main.jsx mounts App component.
useEffect triggers checkAuth() from useAuthStore.
2. Authentication Check
checkAuth calls /api/auth/check.
If valid session: Set authUser state -> Connect Socket -> Render HomePage.
If invalid: Set authUser: null -> Redirect to LoginPage (via Protected Route).
3. Realtime Connection
Once authenticated, useAuthStore connects Socket.IO with userId query param.
Server maps userId to socketId.
Client listens for getOnlineUsers to update sidebar status.
4. Messaging Flow
User selects a contact from Sidebar.
getMessages(id) fetches chat history from backend.
User sends a message -> POST /api/messages/send/:id.
Backend saves to DB -> Emits newMessage via Socket.
Receiver's client (useChatStore) listens to newMessage and appends to state.
UI updates instantly.
============================================================================
11. BACKEND INTERNAL FLOW
============================================================================
Request Processing Pipeline
Request (GET /messages/:id)
   │
   ▼
server.js (App Entry)
   │
   ▼
navigates to message.route.js
   │
   ▼
Middleware: protectRoute()
   ├─ Checks Cookie
   ├─ Verifies JWT
   └─ Attaches req.user
   │
   ▼
Controller: getMessages(req, res)
   ├─ Extract receiverId (params) & senderId (req.user)
   ├─ Query DB (Message.find with $or condition)
   └─ Return JSON
   │
   ▼
Response sent to Client
============================================================================
12. FRONTEND INTERNAL FLOW
============================================================================
Component Hierarchy & State
App.jsx
 ├── Navbar (Access Global Store for Auth/Theme)
 └── Routes
      ├── HomePage (Protected)
      │    ├── Sidebar (uses useChatStore -> users)
      │    └── ChatContainer (uses useChatStore -> messages/subscribe)
      │         ├── ChatHeader
      │         ├── MessageInput (uses useChatStore -> sendMessage)
      │         └── MessageSkeleton (Loading State)
      ├── LoginPage
      └── SignupPage
State Integration
Stores: Centralized logic in src/store/.
Components: Subscribe to stores using selectors.
Updates: Components call store actions (signup, sendMessage), which handle API calls and state updates.
============================================================================
13. AUTO API DOCUMENTATION
============================================================================
API Endpoints Overview
Method	Endpoint	Description	Auth Required	Middleware
POST	/api/auth/signup	Register new user	No	-
POST	/api/auth/login	User login	No	-
POST	/api/auth/logout	User logout	No	-
PUT	/api/auth/update-profile	Update profile picture	Yes	protectRoute
GET	/api/auth/check	Verify current session	Yes	protectRoute
GET	/api/messages/users	Get sidebar users	Yes	protectRoute
GET	/api/messages/:id	Get chat history	Yes	protectRoute
POST	/api/messages/send/:id	Send a message	Yes	protectRoute
API Endpoint Details
Authentication Endpoints
POST /api/auth/signup
Purpose: Register a new user
HTTP Method: POST
Route Path: /api/auth/signup
Authentication Required: No
Middleware Used: None
Request Body:

json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response (200 OK):

json
{
  "_id": "67b4...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
Flow: Route → Controller (validate, hash password, create user) → Model (Save) → Generate Token (Cookie) → Response

POST /api/auth/login
Purpose: Authenticate user and get session
HTTP Method: POST
Route Path: /api/auth/login
Authentication Required: No
Middleware Used: None
Request Body:

json
{
  "email": "john@example.com",
  "password": "password123"
}
Response (200 OK):

json
{
  "_id": "67b4...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
Flow: Route → Controller (find user, compare bcrypt password) → Generate Token (Cookie) → Response

POST /api/auth/logout
Purpose: End user session
HTTP Method: POST
Route Path: /api/auth/logout
Authentication Required: No
Middleware Used: None
Request Body: None

Response (200 OK):

json
{
  "message": "Logged out successfully"
}
Flow: Route → Controller (clear 'jwt' cookie) → Response

PUT /api/auth/update-profile
Purpose: Update user profile picture
HTTP Method: PUT
Route Path: /api/auth/update-profile
Authentication Required: Yes
Middleware Used: protectRoute
Request Body:

json
{
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSw..."
}
Response (200 OK):

json
{
  "_id": "67b4...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
Flow: Middleware(Verify Auth) → Controller (Upload to Cloudinary) → Model (Update User) → Response

GET /api/auth/check
Purpose: Verify if user is authenticated on page load
HTTP Method: GET
Route Path: /api/auth/check
Authentication Required: Yes
Middleware Used: protectRoute
Response (200 OK):

json
{
  "_id": "67b4...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
Flow: Middleware (Verify Token, Attach User) → Controller (Return User)

Messaging Endpoints
GET /api/messages/users
Purpose: Get list of users for sidebar (excluding self)
HTTP Method: GET
Route Path: /api/messages/users
Authentication Required: Yes
Middleware Used: protectRoute
Response (200 OK):

json
[
  {
    "_id": "67b5...",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "profilePic": "..."
  }
]
Flow: Middleware → Controller (Find users where _id != currentUserId) → Response

GET /api/messages/:id
Purpose: Get chat history with a specific user
HTTP Method: GET
Route Path: /api/messages/:id
Authentication Required: Yes
Middleware Used: protectRoute
URL Params:

id: The User ID of the person you are chatting with.
Response (200 OK):

json
[
  {
    "_id": "msg1...",
    "senderId": "myId...",
    "receiverId": "theirId...",
    "text": "Hello!",
    "image": null,
    "createdAt": "2024-02-14T10:00:00.000Z"
  }
]
Flow: Middleware → Controller (Find messages where sender=me&receiver=them OR sender=them&receiver=me) → Response

POST /api/messages/send/:id
Purpose: Send a message to a user
HTTP Method: POST
Route Path: /api/messages/send/:id
Authentication Required: Yes
Middleware Used: protectRoute
URL Params:

id: The User ID of the receiver.
Request Body:

json
{
  "text": "Hello there!",
  "image": "data:image/png;base64,..." // Optional
}
Response (201 Created):

json
{
  "_id": "msg2...",
  "senderId": "myId...",
  "receiverId": "theirId...",
  "text": "Hello there!",
  "image": "https://res.cloudinary.com/...",
  "createdAt": "..."
}
Flow: Middleware → Controller (Upload image if any, Create Message, Save to DB) → Socket.IO (Emit 'newMessage') → Response

============================================================================
14. DEPENDENCIES INSTALLATION
============================================================================
Backend Setup
Navigate to backend: cd backend
Install dependencies: npm install
Setup .env file (see Section 15).
Start dev server: npm run dev
Key Packages: express, mongoose, socket.io, jsonwebtoken, cloudinary.

Frontend Setup
Navigate to frontend: cd frontend
Install dependencies: npm install
Start dev server: npm run dev
Key Packages: react, vite, zustand, socket.io-client, tailwindcss.

============================================================================
15. ENVIRONMENT VARIABLES
============================================================================
Create a .env file in the backend/ directory with the following:

Variable	Description	Example
MONGODB_URI	Connection string for MongoDB	mongodb+srv://...
PORT	API Server Port	5001
JWT_SECRET	Secret key for signing tokens	mysecretkey123
CLOUDINARY_CLOUD_NAME	Cloudinary Cloud Name	dx...
CLOUDINARY_API_KEY	Cloudinary API Key	123...
CLOUDINARY_API_SECRET	Cloudinary Secret	abc...
NODE_ENV	Environment (development/production)	development
============================================================================
16. HOW TO RUN PROJECT
============================================================================
Step 1: Database Setup
Ensure you have a MongoDB Atlas account or local MongoDB instance running.

Step 2: Backend
bash
cd backend
npm install
npm run dev
# Server should run on port 5001 and connect to MongoDB
Step 3: Frontend
bash
cd frontend
npm install
npm run dev
# App should run on http://localhost:5173
Step 4: Access
Open http://localhost:5173 in your browser. Create an account and open another window (incognito) to test messaging between two accounts.

============================================================================
17. RUNTIME FLOW (AFTER STARTUP)
============================================================================
Servers Start: Backend listens on 5001, Frontend on 5173.
DB Connection: Mongoose connects to MongoDB URI.
Socket Init: Socket.IO server waits for connections.
Browser Load: Frontend loads, checking /api/auth/check.
If logged in -> Socket connects -> Dashboard displays.
If guest -> Redirects to Login.
User Interaction: Messages sent triggers API + Socket events parallely.
============================================================================
18. COMMON ERRORS & FIXES
============================================================================
1. MongoDB Connection Error
Cause: Invalid URI or IP whitelist.
Fix: Check .env URI and whitelist IP in MongoDB Atlas.
2. CORS Error (Access blocked)
Cause: Frontend origin not allowed in Backend.
Fix: Update origin in index.js (cors config) and socket.js.
3. Images Not Uploading
Cause: Cloudinary credentials missing/wrong or image too large.
Fix: Verify keys in .env and payload size limits in index.js.
4. Socket Not Connecting
Cause: Port mismatch or mismatched protocol (http/https).
Fix: Ensure client connects to correct Backend URL (http://localhost:5001).
============================================================================
19. DEVELOPER NOTES
============================================================================
Scalability Improvements
Redis Adapter: Use Redis for Socket.IO scaling across multiple server instances.
Pagination: Implement pagination for message history to reduce load.
Message Queue: Use RabbitMQ/Redis for processing heavy tasks (like image processing).
Performance Suggestions
Image Optimization: Resize images on client-side before upload.
Lazy Loading: Messages are currently fetching all history; implement infinite scroll.
Virtualization: Use react-window for long chat lists.
Security Improvements
Rate Limiting: Add express-rate-limit for API routes.
Input Sanitization: Use express-validator to sanitize inputs.
Token Rotation: Implement Refresh Tokens for better security hygiene.
============================================================================
END OF DOCUMENTATION
============================================================================
by Yash Lagare 2026-02-17
