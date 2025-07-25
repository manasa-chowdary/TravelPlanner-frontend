import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [tripName, setTripName] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripName || !source || !destination || !startDate || !endDate) {
      alert('Please fill all fields');
      return;
    }

    try {
      console.log({
        name: tripName,
        from: source,
        to: destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      await axios.post(
        'http://localhost:8000/api/v1/trips/createtrip',
        {
          name: tripName,
          from: source,
          to: destination,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Trip Created Successfully');
      setTripName('');
      setSource('');
      setDestination('');
      setStartDate(dayjs());
      setEndDate(dayjs());
    } catch (err) {
      console.error('Failed to create trip', err.response?.data || err.message);
      alert('Failed to create trip');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ background: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Travel Planner
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/triplist')}>
            Trip List
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Trip Form Section */}
      <Box
        sx={{
          width: '100vw',
          height: 'calc(100vh - 64px)',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 3
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Plan Your Trip ✈️
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Trip Name"
              fullWidth
              margin="normal"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />
            <TextField
              label="From"
              fullWidth
              margin="normal"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
            <TextField
              label="To"
              fullWidth
              margin="normal"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    required: true
                  }
                }}
              />
              <DatePicker
                label="To Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    required: true
                  }
                }}
              />
            </LocalizationProvider>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Create Trip
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
