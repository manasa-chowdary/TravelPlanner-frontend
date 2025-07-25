import React from 'react';
import { Box, Typography } from '@mui/material';

const MapPicker = () => (
  <Box sx={{ height: 200, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2">[Google Maps Picker Placeholder]</Typography>
    {/* Integrate Google Maps here and call onSelect({ address, lat, lng }) when a location is picked */}
  </Box>
);

export default MapPicker;
