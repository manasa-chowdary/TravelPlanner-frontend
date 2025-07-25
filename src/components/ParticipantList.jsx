import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ParticipantList = ({ participants, onAdd, onRemove }) => {
  const [email, setEmail] = useState('');
  return (
    <Box>
      <Typography variant="subtitle1">Participants:</Typography>
      <List>
        {participants.map((p, i) => (
          <ListItem key={i} secondaryAction={
            <IconButton edge="end" onClick={() => onRemove(p)}>
              <DeleteIcon />
            </IconButton>
          }>
            {p}
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <TextField
          label="Add by email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={() => { onAdd(email); setEmail(''); }}>Add</Button>
      </Box>
    </Box>
  );
};

export default ParticipantList;
