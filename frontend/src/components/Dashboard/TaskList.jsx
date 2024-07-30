import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import TaskForm from './TaskForm';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(projectId);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Tasks</Typography>
      <TaskForm projectId={projectId} fetchTasks={fetchTasks} />
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText primary={`${task.title} - ${task.status}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TaskList;
