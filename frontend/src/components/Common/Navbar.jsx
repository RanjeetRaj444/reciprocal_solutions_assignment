import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  const isAdmin = localStorage.getItem('role') === 'Admin';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Project Management Tool
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        {isAdmin && <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>}
        <Button color="inherit" component={Link} to="/logout">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
