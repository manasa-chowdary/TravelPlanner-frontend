import React from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';

const ItineraryDay = ({ day, date, activities, onAddActivity, onEditActivity, onDeleteActivity }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6">Day {day} - {new Date(date).toLocaleDateString()}</Typography>
    <List>
      {activities.map((activity, i) => (
        <ListItem key={i}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography><strong>{activity.name}</strong> ({activity.time})</Typography>
            <Typography variant="body2">{activity.location?.address}</Typography>
            <Typography variant="body2">{activity.description}</Typography>
            <Typography variant="body2">Tags: {activity.tags?.join(', ')}</Typography>
          </Box>
          <Button size="small" onClick={() => onEditActivity(activity)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDeleteActivity(activity)}>Delete</Button>
        </ListItem>
      ))}
    </List>
    <Button variant="outlined" onClick={onAddActivity}>Add Activity</Button>
  </Box>
);

export default ItineraryDay;
