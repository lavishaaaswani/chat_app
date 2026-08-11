# Chat App

**Live demo:** https://chat-app-diyk.onrender.com
*(Free tier - first load may take ~50s to wake up if it's been inactive.)*

A full-stack real-time chat and video calling app with authentication, friend requests, live notifications, and a themeable UI.

## Highlights

- 🔐 **JWT Authentication** with protected routes
- 💬 **Real-time 1-on-1 Messaging** powered by Stream Chat
- 📹 **1-on-1 Video Calls** powered by Stream Video
- 👥 **Friend Requests** - send, accept, and browse recommended users
- 🔔 **Live Notifications** - unread messages and friend requests shown in real time via websocket events, no polling
- 🎨 **32+ UI Themes** via DaisyUI, including a custom "Aurora" theme
- 🌍 **Language Exchange Profiles** - native/learning language, bio, location
- 🧠 **Global State** with Zustand, server state with TanStack Query

---

## Tech Stack
- **Frontend:** React (Vite), Zustand, TanStack Query, TailwindCSS + DaisyUI, Axios, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Realtime:** Stream Chat & Stream Video

---

## Folder Structure
```
chat_app/
  backend/      # Express server, API routes, MongoDB models
  frontend/     # React app (UI, components, routing)
```

---

## Environment Variables

### Backend (`/backend/.env`)
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend/.env`)
```
VITE_STREAM_API_KEY=your_stream_api_key
```

Get MongoDB credentials from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and Stream credentials from [GetStream.io](https://getstream.io/).

---

## Running Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Both need to run at the same time - backend on port 5001, frontend on port 5173.

---

## Usage
1. Sign up for a new account.
2. Complete onboarding (name, bio, languages, location).
3. Send/accept friend requests from the Notifications page.
4. Chat and start video calls with friends in real time.

---

## Scripts
- **Backend:** `npm run dev` - starts the Express server with nodemon
- **Frontend:** `npm run dev` - starts the Vite dev server, `npm run build` - production build
