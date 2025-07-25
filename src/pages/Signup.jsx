import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from '@mui/material';

import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/signup', formData);
      alert('Signup successful! Now login.');
      console.log(res.data);
      navigate('/'); // ✅ Redirect after signup
    } catch (err) {
      console.error(err.response?.data?.message || 'Signup failed');
      alert('Signup failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 350, background: 'rgba(255,255,255,0.97)' }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullName"
            type="text"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/')}
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
