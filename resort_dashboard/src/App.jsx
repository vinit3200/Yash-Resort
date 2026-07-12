import React from 'react';
import { ChakraProvider, defaultSystem, Box } from '@chakra-ui/react';

import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Resorts from './pages/Resorts';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Events from './pages/Events';
import Feedbacks from './pages/Feedbacks';
import Availability from './pages/Availability';

function AppContent() {
  return (
    <Box display="flex" minH="100vh" bg="#FAF6F0">
      <Sidebar />
      <Box flex="1" ml={{ base: 0, lg: "280px" }} transition="margin 0.3s" overflowX="hidden">
        <Navbar />
        <Box p={{ base: 6, md: 10, xl: 14 }} maxW="1600px" mx="auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resorts" element={<Resorts />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/events" element={<Events />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
