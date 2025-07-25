import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getMyTrips } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BudgetTracker = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const token = localStorage.getItem('token');
      const res = await getMyTrips(token);
      const found = res.data.find(t => t._id === tripId);
      setTrip(found);
    };
    fetchTrip();
  }, [tripId]);

  if (!trip) return <Typography>Loading...</Typography>;

  const totalExpenses = trip.expenses ? trip.expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0;
  const remaining = trip.budget ? trip.budget - totalExpenses : 0;

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Budget Tracker</Typography>
          <Typography><strong>Trip:</strong> {trip.name}</Typography>
          <Typography><strong>Budget:</strong> ${trip.budget || 0}</Typography>
          <Typography><strong>Total Expenses:</strong> ${totalExpenses}</Typography>
          <Typography><strong>Remaining:</strong> ${remaining}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Expenses</Typography>
          <List>
            {trip.expenses && trip.expenses.length > 0 ? (
              trip.expenses.map((exp, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={`${exp.description} - $${exp.amount}`}
                    secondary={exp.date ? new Date(exp.date).toLocaleDateString() : ''}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No expenses yet.</Typography>
            )}
          </List>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default BudgetTracker;


