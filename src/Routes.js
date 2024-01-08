// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import TherapistDirectory from './components/TherapistDirectory';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="/resources" element={<Resources />} />
            <Route path="/therapists" element={<TherapistDirectory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
