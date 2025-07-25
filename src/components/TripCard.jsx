import React from 'react';
import { Card, CardContent, Typography, Divider, Box, Button } from '@mui/material';

const TripCard = ({ trip, onEdit, onDelete, onBudget, onExpense, onParticipants }) => {
  const totalExpenses = trip.expenses ? trip.expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0;
  const remaining = trip.budget ? trip.budget - totalExpenses : 0;

  return (
    <Card sx={{ backgroundColor: '#ffffffdd', borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="primary">{trip.name}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography><strong>From:</strong> {trip.from}</Typography>
        <Typography><strong>To:</strong> {trip.to}</Typography>
        <Typography><strong>Start:</strong> {new Date(trip.startDate).toLocaleDateString()}</Typography>
        <Typography><strong>End:</strong> {new Date(trip.endDate).toLocaleDateString()}</Typography>
        <Typography sx={{ mt: 1 }}><strong>Budget:</strong> ${trip.budget || 0}</Typography>
        <Typography><strong>Total Expenses:</strong> ${totalExpenses}</Typography>
        <Typography><strong>Remaining:</strong> ${remaining}</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" onClick={onBudget}>Edit Budget</Button>
          <Button variant="outlined" size="small" onClick={onExpense}>Add Expense</Button>
          <Button variant="outlined" size="small" onClick={onParticipants}>Participants</Button>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" size="small" onClick={onEdit}>Edit</Button>
          <Button variant="outlined" color="error" size="small" onClick={onDelete}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard; 