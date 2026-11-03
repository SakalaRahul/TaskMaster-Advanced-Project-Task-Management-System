import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CheckSquare, Users, Settings } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

export default function App() {
  const [tasks, setTasks] = useState([
    { _id: '1', title: 'Design REST API Architecture', status: 'In Progress', priority: 'High' },
    { _id: '2', title: 'Implement JWT Middleware', status: 'Completed', priority: 'Urgent' },
    { _id: '3', title: 'Setup Flutter Local SQLite Schema', status: 'To Do', priority: 'Medium' },
    { _id: '4', title: 'Configure Firebase Push Notifications', status: 'In Review', priority: 'Low' }
  ]);

  useEffect(() => {
    socket.emit('join_project', 'proj_123');
    socket.on('task_updated', (updatedTask) => {
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
    });
  }, []);

  const moveTask = (id, newStatus) => {
    setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
  };

  const columns = ['To Do', 'In Progress', 'In Review', 'Completed'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', background: '#1e293b', padding: '1.5rem', borderRight: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '2rem' }}>TaskMaster</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="#" style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center' }}><LayoutDashboard size={20}/> Kanban Board</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center' }}><CheckSquare size={20}/> My Tasks</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Users size={20}/> Team Workspace</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Settings size={20}/> Settings</a>
        </nav>
      </aside>

      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1>Project Workspace: E-Commerce Redesign</h1>
            <p style={{ color: '#94a3b8' }}>Real-time team collaboration powered by WebSockets</p>
          </div>
          <button style={{ background: '#0284c7', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            + Add Task
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {columns.map(col => (
            <div key={col} style={{ background: '#1e293b', borderRadius: '10px', padding: '1rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#cbd5e1' }}>{col}</h3>
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task._id} style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', borderLeft: '4px solid #38bdf8' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{task.title}</h4>
                  <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{task.priority}</span>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.25rem' }}>
                    {columns.filter(c => c !== col).map(c => (
                      <button key={c} onClick={() => moveTask(task._id, c)} style={{ fontSize: '0.65rem', background: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '0.2rem 0.4rem' }}>
                        → {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
