'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
}

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    const res = await api.get('/tasks');
    setTasks(res.data);
  }

  async function createTask() {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }

    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    await api.post('/tasks', {
      title,
      description,
    });

    setTitle('');
    setDescription('');
    setError('');

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Task Tracker</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Create Task</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button onClick={createTask}>
          Create Task
        </button>

        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: '1px solid gray',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <strong>{task.status}</strong>

          <br />
          <br />

          <button
            onClick={async () => {
              await api.delete(`/tasks/${task.id}`);
              fetchTasks();
            }}
          >
            Delete
          </button>

          <span style={{ marginLeft: '10px' }} />

          <button
            onClick={async () => {
              await api.patch(`/tasks/${task.id}`, {
                status:
                  task.status === 'PENDING'
                    ? 'COMPLETED'
                    : 'PENDING',
              });

              fetchTasks();
            }}
          >
            Toggle Status
          </button>
        </div>
      ))}
    </main>
  );
}