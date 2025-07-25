import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Chip, Box } from '@mui/material';

const ActivityForm = ({ open, onClose, onSave, initial }) => {
  const [form, setForm] = useState(initial || { name: '', location: { address: '', lat: '', lng: '' }, time: '', description: '', tags: [] });
  const [tag, setTag] = useState('');

  useEffect(() => {
    setForm(initial || { name: '', location: { address: '', lat: '', lng: '' }, time: '', description: '', tags: [] });
  }, [initial, open]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLocationChange = e => setForm({ ...form, location: { ...form.location, [e.target.name]: e.target.value } });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? 'Edit' : 'Add'} Activity</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Location" name="address" value={form.location.address} onChange={handleLocationChange} fullWidth sx={{ mb: 2 }} />
        {/* For Google Maps integration, you can add a MapPicker component here */}
        <TextField label="Latitude" name="lat" value={form.location.lat} onChange={handleLocationChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Longitude" name="lng" value={form.location.lng} onChange={handleLocationChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Time" name="time" value={form.time} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField label="Add Tag" value={tag} onChange={e => setTag(e.target.value)} size="small" />
          <Button onClick={() => { if(tag) { setForm({ ...form, tags: [...form.tags, tag] }); setTag(''); } }}>Add</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {form.tags.map((t, i) => (
            <Chip key={i} label={t} onDelete={() => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) })} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">{initial ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityForm;
