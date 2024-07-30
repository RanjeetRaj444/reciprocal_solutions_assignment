import React, { useEffect, useState } from 'react';
import { getProjects } from '../../api';
import ProjectForm from './ProjectForm';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Projects</Typography>
      <ProjectForm fetchProjects={fetchProjects} />
      <List>
        {projects.map((project) => (
          <ListItem key={project._id}>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ProjectList;
