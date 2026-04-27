import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Box minH="100vh" bg="#FAF6F0">
      <Sidebar />
      <Box ml={{ base: 0, md: '280px' }} minH="100vh">
        <Navbar />
        <Box maxW="1280px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
