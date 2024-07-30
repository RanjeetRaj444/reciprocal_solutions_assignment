import React, { useState } from 'react';
import { createTask } from '../../services/api';
import { TextField, Button } from '@mui/material';

function TaskForm({ projectId, fetchTasks }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(projectId, { title });
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Task</Button>
    </form>
  );
}

export default TaskForm;
