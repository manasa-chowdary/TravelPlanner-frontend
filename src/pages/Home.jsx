import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signupUser, loginUser } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Signup form state
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', password: '' });
  // Login form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Signup handlers
  const handleSignupChange = e => setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  const handleSignup = async e => {
    e.preventDefault();
    try {
      await signupUser(signupForm);
      alert('Signup successful! Please login.');
      setShowSignup(false);
      setShowLogin(true);
    } catch (err) {
      alert('Signup failed');
    }
  };

  // Login handlers
  const handleLoginChange = e => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(loginForm);
      localStorage.setItem('token', res.data.token);
      setShowLogin(false);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#222',
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
          Welcome to Travel Planner!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
          Plan, organize, and enjoy your trips with ease.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Footer />

      {/* Signup Modal */}
      <Dialog open={showSignup} onClose={() => setShowSignup(false)}>
        <DialogTitle>Sign Up</DialogTitle>
        <form onSubmit={handleSignup}>
          <DialogContent>
            <TextField
              label="Full Name"
              name="fullName"
              value={signupForm.fullName}
              onChange={handleSignupChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSignup(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Sign Up</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleLogin}>
          <DialogContent>
            <TextField
              label="Email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLogin(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Home;
