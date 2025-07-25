// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TripList from './pages/TripList';
import TripDetail from './pages/TripDetail';
import BudgetTracker from './pages/BudgetTracker';
import ItineraryBuilder from './pages/ItineraryBuilder';
import LogisticsPage from './pages/LogisticsPage'; // <-- This import is required
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/triplist" element={<TripList />} />
        <Route path="/tripdetail/:tripId" element={<TripDetail />} />
        <Route path="/budgettracker/:tripId" element={<BudgetTracker />} />
        <Route path="/itinerarybuilder/:tripId" element={<ItineraryBuilder />} />
        <Route path="/logistics/:tripId" element={<LogisticsPage />} /> {/* <-- This line is required */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;  