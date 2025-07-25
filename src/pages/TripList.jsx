import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import { updateTripBudget, addTripExpense } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import TripCard from '../components/TripCard';
import ParticipantList from '../components/ParticipantList';
import ItineraryDay from '../components/ItineraryDay';
import ActivityForm from '../components/ActivityForm';
import ExpenseForm from '../components/ExpenseForm';
import MapPicker from '../components/MapPicker';
import { useNavigate } from 'react-router-dom';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editTrip, setEditTrip] = useState(null);
  const [editForm, setEditForm] = useState({ from: '', to: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(false);
  const [budgetDialog, setBudgetDialog] = useState({ open: false, trip: null, value: '' });
  const [expenseDialog, setExpenseDialog] = useState({ open: false, trip: null, description: '', amount: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found.');
        return;
      }
      const response = await axios.get(
        'http://localhost:8000/api/v1/trips/mytrips',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/v1/trips/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(trips.filter((trip) => trip._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (trip) => {
    setEditTrip(trip);
    setEditForm({
      from: trip.from || '',
      to: trip.to || '',
      startDate: trip.startDate ? trip.startDate.slice(0, 10) : '',
      endDate: trip.endDate ? trip.endDate.slice(0, 10) : '',
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTrip) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8000/api/v1/trips/${editTrip._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTrips(trips.map((t) => (t._id === editTrip._id ? response.data : t)));
      setEditTrip(null);
    } catch (error) {
      console.error('Error editing trip:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />
      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 6,
          paddingBottom: 6,
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <PublicIcon fontSize="large" /> My Travel Plans
          </Typography>
          <Typography variant="subtitle1">
            Explore your saved adventures ✈️
          </Typography>
        </Box>
        <Grid container columns={12} columnSpacing={4} justifyContent="center">
          {trips.map((trip, index) => (
            <Grid key={trip._id || index} sx={{ gridColumn: 'span 12', '@media (min-width:600px)': { gridColumn: 'span 6' }, '@media (min-width:900px)': { gridColumn: 'span 4' } }}>
              <Card
                sx={{
                  backgroundColor: '#ffffffdd',
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <FlightTakeoffIcon /> Trip {index + 1}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography><strong>From:</strong> {trip.from}</Typography>
                  <Typography><strong>To:</strong> {trip.to}</Typography>
                  {trip.startDate && (
                    <Typography>
                      <strong>Start:</strong>{' '}
                      {new Date(trip.startDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {trip.endDate && (
                    <Typography>
                      <strong>End:</strong>{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </Typography>
                  )}
                  <Typography sx={{ mt: 1 }}><strong>Budget:</strong> ${trip.budget || 0}</Typography>
                  <Typography>
                    <strong>Total Expenses:</strong> $
                    {trip.expenses ? trip.expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0}
                  </Typography>
                  <Typography>
                    <strong>Remaining:</strong> $
                    {trip.budget
                      ? trip.budget - (trip.expenses ? trip.expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0)
                      : 0}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setBudgetDialog({ open: true, trip, value: trip.budget || '' })}
                    >
                      {trip.budget ? 'Edit Budget' : 'Add Budget'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setExpenseDialog({ open: true, trip, description: '', amount: '' })}
                    >
                      Add Expense
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/logistics/${trip._id}`)}
                    >
                      View Logistics
                    </Button>
                  </Box>
                  {trip.expenses && trip.expenses.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2">Expenses:</Typography>
                      {trip.expenses.map((exp, i) => (
                        <Typography key={i} sx={{ fontSize: 14 }}>
                          - {exp.description}: ${exp.amount}
                        </Typography>
                      ))}
                    </Box>
                  )}
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => openEdit(trip)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => setDeleteId(trip._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>Delete Trip</DialogTitle>
          <DialogContent>Are you sure you want to delete this trip?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)} disabled={loading}>Cancel</Button>
            <Button onClick={handleDelete} color="error" disabled={loading}>Delete</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Trip Dialog */}
        <Dialog open={!!editTrip} onClose={() => setEditTrip(null)}>
          <DialogTitle>Edit Trip</DialogTitle>
          <form onSubmit={handleEditSubmit}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
              <TextField
                label="From"
                name="from"
                value={editForm.from}
                onChange={handleEditChange}
                fullWidth
                required
              />
              <TextField
                label="To"
                name="to"
                value={editForm.to}
                onChange={handleEditChange}
                fullWidth
                required
              />
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={editForm.startDate}
                onChange={handleEditChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={editForm.endDate}
                onChange={handleEditChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditTrip(null)} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Save</Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* Budget Dialog */}
        <Dialog open={budgetDialog.open} onClose={() => setBudgetDialog({ ...budgetDialog, open: false })}>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogContent>
            <TextField
              label="Budget"
              type="number"
              value={budgetDialog.value}
              onChange={e => setBudgetDialog({ ...budgetDialog, value: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBudgetDialog({ ...budgetDialog, open: false })}>Cancel</Button>
            <Button
              onClick={async () => {
                const token = localStorage.getItem('token');
                await updateTripBudget(budgetDialog.trip._id, budgetDialog.value, token);
                setBudgetDialog({ ...budgetDialog, open: false });
                fetchTrips();
              }}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Expense Dialog */}
        <Dialog open={expenseDialog.open} onClose={() => setExpenseDialog({ ...expenseDialog, open: false })}>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <TextField
              label="Description"
              value={expenseDialog.description}
              onChange={e => setExpenseDialog({ ...expenseDialog, description: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Amount"
              type="number"
              value={expenseDialog.amount}
              onChange={e => setExpenseDialog({ ...expenseDialog, amount: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setExpenseDialog({ ...expenseDialog, open: false })}>Cancel</Button>
            <Button
              onClick={async () => {
                const token = localStorage.getItem('token');
                await addTripExpense(expenseDialog.trip._id, {
                  description: expenseDialog.description,
                  amount: Number(expenseDialog.amount)
                }, token);
                setExpenseDialog({ ...expenseDialog, open: false });
                fetchTrips();
              }}
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TripList;
