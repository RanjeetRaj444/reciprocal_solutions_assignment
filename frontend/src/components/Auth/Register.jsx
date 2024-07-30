import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';
import { Container, TextField, Button, Typography } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      history.push('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
}

export default Register;
