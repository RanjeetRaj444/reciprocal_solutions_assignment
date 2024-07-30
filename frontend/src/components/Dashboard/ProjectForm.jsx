import React, { useState } from 'react';
import { createProject } from '../../api';
import { TextField, Button, Container } from '@mui/material';

function ProjectForm({ fetchProjects }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name });
      setName('');
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Create Project</Button>
      </form>
    </Container>
  );
}

export default ProjectForm;
