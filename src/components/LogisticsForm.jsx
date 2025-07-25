import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';

const LogisticsForm = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState(initial || { type: '', details: {} });

  useEffect(() => {
    setForm(initial || { type: '', details: {} });
  }, [initial, open]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleDetailsChange = e => setForm({ ...form, details: { ...form.details, [e.target.name]: e.target.value } });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? 'Edit' : 'Add'} Logistics</DialogTitle>
      <DialogContent>
        <TextField select label="Type" name="type" value={form.type} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="flight">Flight</MenuItem>
          <MenuItem value="train">Train</MenuItem>
          <MenuItem value="bus">Bus</MenuItem>
          <MenuItem value="hotel">Hotel</MenuItem>
        </TextField>
        <TextField label="Booking ID" name="bookingId" value={form.details.bookingId || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="From" name="from" value={form.details.from || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="To" name="to" value={form.details.to || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Departure Time" name="departureTime" value={form.details.departureTime || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Arrival Time" name="arrivalTime" value={form.details.arrivalTime || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Address" name="address" value={form.details.address || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Check-In" name="checkIn" value={form.details.checkIn || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Check-Out" name="checkOut" value={form.details.checkOut || ''} onChange={handleDetailsChange} fullWidth sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">{initial ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogisticsForm;
