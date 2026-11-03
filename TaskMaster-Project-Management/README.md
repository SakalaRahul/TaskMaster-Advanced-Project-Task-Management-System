# TaskMaster – Advanced Project & Task Management System

TaskMaster is an enterprise-grade productivity platform offering real-time Kanban task management, team collaboration, activity logging, Socket.IO updates, and interactive analytics.

## Features
- **Kanban Board**: Drag-and-drop task columns (To Do, In Progress, In Review, Completed).
- **Project Workspaces**: Multi-member project assignments, role-based access control, progress tracking.
- **Real-Time Collaboration**: Real-time task changes and comments powered by Socket.IO.
- **Task Analytics**: Visual metrics on task distribution, completion rates, and workload.

## Tech Stack
- **Frontend**: React 18, React Router v6, Redux Toolkit, Socket.IO Client, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.IO, JWT, Bcrypt.js

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Access at `http://localhost:3000`.

## API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate & return JWT |
| `GET` | `/api/projects` | Fetch assigned user projects |
| `POST` | `/api/tasks` | Create task & broadcast via WebSockets |
| `PUT` | `/api/tasks/:id/status` | Update Kanban status |
