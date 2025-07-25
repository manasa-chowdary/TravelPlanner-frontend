import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItineraryDay from '../components/ItineraryDay';
import ActivityForm from '../components/ActivityForm';
import axios from 'axios';

const ItineraryBuilder = () => {
  const { tripId } = useParams();
  const [itinerary, setItinerary] = useState([]);
  const [activityDialog, setActivityDialog] = useState({ open: false, day: null, activity: null });

  useEffect(() => {
    fetchItinerary();
    // eslint-disable-next-line
  }, [tripId]);

  const fetchItinerary = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:8000/api/v1/itinerary/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItinerary(res.data);
  };

  const handleAddActivity = (dayObj) => {
    setActivityDialog({ open: true, day: dayObj, activity: null });
  };

  const handleEditActivity = (dayObj, activity) => {
    setActivityDialog({ open: true, day: dayObj, activity });
  };

  const handleSaveActivity = async (form) => {
    const token = localStorage.getItem('token');
    if (activityDialog.activity) {
      // Edit
      await axios.put(
        `http://localhost:8000/api/v1/itinerary/${activityDialog.day._id}/activity/${activityDialog.activity._id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // Add
      await axios.post(
        `http://localhost:8000/api/v1/itinerary/${activityDialog.day._id}/activity`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setActivityDialog({ open: false, day: null, activity: null });
    fetchItinerary();
  };

  const handleDeleteActivity = async (dayObj, activity) => {
    const token = localStorage.getItem('token');
    await axios.delete(
      `http://localhost:8000/api/v1/itinerary/${dayObj._id}/activity/${activity._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchItinerary();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            p: 3,
            maxWidth: 800,
            width: '100%',
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white', // for text contrast
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.4)', // dark overlay for readability
              zIndex: 1,
              borderRadius: 'inherit',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Travel Logistics
            </Typography>
            {itinerary.length === 0 && <Typography>No itinerary days yet.</Typography>}
            {itinerary.map(dayObj => (
              <ItineraryDay
                key={dayObj._id}
                day={dayObj.day}
                date={dayObj.date}
                activities={dayObj.activities}
                onAddActivity={() => handleAddActivity(dayObj)}
                onEditActivity={activity => handleEditActivity(dayObj, activity)}
                onDeleteActivity={activity => handleDeleteActivity(dayObj, activity)}
              />
            ))}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={async () => {
                const token = localStorage.getItem('token');
                const nextDay = itinerary.length + 1;
                await axios.post(
                  `http://localhost:8000/api/v1/itinerary/${tripId}/day`,
                  { day: nextDay, date: new Date() },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                fetchItinerary();
              }}
            >
              Add Day
            </Button>
          </Box>
        </Paper>
      </Box>
      <ActivityForm
        open={activityDialog.open}
        onClose={() => setActivityDialog({ open: false, day: null, activity: null })}
        onSave={handleSaveActivity}
        initial={activityDialog.activity}
      />
      <Footer />
    </>
  );
};

export default ItineraryBuilder;
