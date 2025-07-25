import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ textAlign: 'center', py: 2, background: '#1976d2', color: 'white', mt: 4 }}>
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Travel Planner. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
