import axios from 'axios';

const API = axios.create({
  baseURL: 'https://travelplanner-backend-3.onrender.com',
});

export const signupUser = (data) => API.post('/auth/signup', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Trip Budget & Expenses APIs
export const updateTripBudget = (tripId, budget, token) =>
  API.put(`/trips/budget/${tripId}`, { budget }, { headers: { Authorization: `Bearer ${token}` } });

export const addTripExpense = (tripId, expense, token) =>
  API.post(`/trips/expense/${tripId}`, expense, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTripExpense = (tripId, expenseId, token) =>
  API.delete(`/trips/expense/${tripId}/${expenseId}`, { headers: { Authorization: `Bearer ${token}` } });

// Get affordable expenses (expenses less than or equal to budget left)
export const getAffordableExpenses = (tripId, token) =>
  API.get(`/trips/${tripId}`, { headers: { Authorization: `Bearer ${token}` } });

export const getMyTrips = (token) =>
  API.get('/trips/mytrips', { headers: { Authorization: `Bearer ${token}` } });
