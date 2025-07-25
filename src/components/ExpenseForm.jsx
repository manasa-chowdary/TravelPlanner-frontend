import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ExpenseForm = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState(initial || { description: '', amount: '', person: '', date: '' });

  useEffect(() => {
    setForm(initial || { description: '', amount: '', person: '', date: '' });
  }, [initial, open]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? 'Edit' : 'Add'} Expense</DialogTitle>
      <DialogContent>
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Person" name="person" value={form.person} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">{initial ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
