// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
