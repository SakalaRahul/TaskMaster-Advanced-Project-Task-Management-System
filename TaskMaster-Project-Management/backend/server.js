const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
});

app.use(cors());
app.use(express.json());

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`Socket Client Connected: ${socket.id}`);
  
  socket.on('join_project', (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project room: ${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket Client Disconnected: ${socket.id}`);
  });
});

app.set('io', io);

// Models & Routes
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'test') {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmaster';
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('TaskMaster MongoDB Connected.');
      server.listen(PORT, () => console.log(`TaskMaster Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
}

module.exports = { app, server };
