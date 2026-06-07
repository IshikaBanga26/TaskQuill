# TaskQuill

A full-stack task management web application built with the MERN stack. Users can register, log in securely, and manage their daily tasks — add, edit, delete, and mark them as completed or pending.

Live Demo : https://taskquill.pages.dev

---

## Tech Stack

**Frontend** — React, Vite, React Router, Axios  
**Backend** — Node.js, Express.js  
**Database** — MongoDB Atlas  
**Auth** — JWT + bcryptjs  

---

## Features

- User registration and login with JWT authentication
- Protected routes on both frontend and backend
- Create, edit, delete tasks
- Toggle task status between pending and completed
- Search tasks by title
- Filter by all / pending / completed
- Task overview stats (total, pending, completed)
- Light and dark theme toggle
- Responsive sidebar layout

---

## Project Structure

taskquill/
├── backend/
│   ├── models/         User.js, Task.js
│   ├── routes/         auth.js, tasks.js
│   ├── middleware/     authMiddleware.js
│   └── server.js
└── frontend/
└── src/
├── api/        axios.js
├── components/ TaskCard.jsx
├── hooks/      useTasks.js
├── pages/      Login.jsx, Register.jsx, Dashboard.jsx
└── App.jsx

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

```bash
npm run dev
```

Backend runs on `https://taskquill.onrender.com`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `https://taskquill.pages.dev`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get token |

### Tasks (protected — requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| PORT | Backend port (default 5000) |

---

## Deployment

- Backend: Render
- Frontend: Cloudflare Pages

