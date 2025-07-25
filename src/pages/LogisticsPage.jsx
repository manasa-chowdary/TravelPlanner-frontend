import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LogisticsForm from '../components/LogisticsForm';
import axios from 'axios';

const LogisticsPage = () => {
  const { tripId } = useParams();
  const [logistics, setLogistics] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchLogistics();
    // eslint-disable-next-line
  }, [tripId]);

  const fetchLogistics = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:8000/api/v1/logistics/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLogistics(res.data);
  };

  const handleAdd = () => setFormOpen(true);

  const handleSave = async (form) => {
    const token = localStorage.getItem('token');
    await axios.post(
      `http://localhost:8000/api/v1/logistics/${tripId}`,
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFormOpen(false);
    fetchLogistics();
  };

  const handleDelete = async (logisticsId) => {
    const token = localStorage.getItem('token');
    await axios.delete(
      `http://localhost:8000/api/v1/logistics/${logisticsId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchLogistics();
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Travel Logistics</Typography>
          <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>Add Transport/Hotel</Button>
          <List>
            {logistics.length === 0 && <Typography>No logistics added yet.</Typography>}
            {logistics.map((item) => (
              <ListItem key={item._id}
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.type.toUpperCase()} - ${item.details.bookingId || ''}`}
                  secondary={
                    <>
                      {item.details.from && <span><b>From:</b> {item.details.from} </span>}
                      {item.details.to && <span><b>To:</b> {item.details.to} </span>}
                      {item.details.departureTime && <span><b>Departure:</b> {new Date(item.details.departureTime).toLocaleString()} </span>}
                      {item.details.arrivalTime && <span><b>Arrival:</b> {new Date(item.details.arrivalTime).toLocaleString()} </span>}
                      {item.details.address && <span><b>Address:</b> {item.details.address} </span>}
                      {item.details.checkIn && <span><b>Check-In:</b> {new Date(item.details.checkIn).toLocaleString()} </span>}
                      {item.details.checkOut && <span><b>Check-Out:</b> {new Date(item.details.checkOut).toLocaleString()} </span>}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <LogisticsForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
      <Footer />
    </>
  );
};

export default LogisticsPage;


