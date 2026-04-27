import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import store from './store';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Resorts from './pages/Resorts';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Events from './pages/Events';

function AppContent() {
  return (
    <Box display="flex" minH="100vh" bg="#FAF6F0">
      <Sidebar />
      <Box flex="1" ml={{ base: 0, lg: "280px" }} transition="margin 0.3s">
        <Navbar />
        <Box p={{ base: 4, md: 8 }} maxW="1280px" mx="auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resorts" element={<Resorts />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/events" element={<Events />} />
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
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
