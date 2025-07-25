import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password');
      return;
    }

    console.log('Submitting login:', formData);
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/login', formData);
      alert('Login successful');
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      // Navigate to home or dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.message || 'Login failed');
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("https://images.unsplash.com/photo-1465101046530-73398c7f28ca")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 350, background: 'rgba(255,255,255,0.97)' }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
  <TextField
    fullWidth
    margin="normal"
    name="email"
    type="email"
    onChange={handleChange}
    required
    placeholder="Email"
    variant="outlined"
  />

  <TextField
    fullWidth
    margin="normal"
    name="password"
    type="password"
    onChange={handleChange}
    required
    placeholder="Password"
    variant="outlined"
  />

  <Button
    type="submit"
    variant="contained"
    color="primary"
    fullWidth
    sx={{ mt: 2 }}
  >
            Login
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
