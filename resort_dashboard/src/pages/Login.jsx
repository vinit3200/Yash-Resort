import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  useToast,
  HStack,
  Spinner
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setCredentials, setLoading, setError, clearError } from '../store/slices/authSlice';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await api.post('/auth/login', { adminId, password });
      const { token, admin } = response.data;

      dispatch(setCredentials({ token, user: admin }));
      toast({
        title: 'Welcome back, Admin',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      dispatch(setError(message));
      toast({
        title: 'Authentication Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#FAF6F0" // Cream background from luxury theme
      p={4}
    >
      <Box
        maxW="400px"
        w="100%"
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="0 20px 40px -12px rgba(0,0,0,0.1)"
        border="1px solid #E8E0D6"
      >
        <VStack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Box
              p={3}
              bg="#3D2010"
              borderRadius="full"
              color="white"
            >
              <Lock size={24} />
            </Box>
            <Heading
              fontFamily="'Playfair Display', serif"
              fontSize="2xl"
              color="#3D2010"
            >
              Admin Access
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Secure portal for Yash Resorts Management
            </Text>
          </VStack>

          <form onSubmit={handleLogin} w="100%">
            <VStack spacing={4}>
              <Box>
                <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1} textTransform="uppercase" letterSpacing="wide">
                  Admin ID
                </Text>
                <Input
                  placeholder="Enter your ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  focusBorderColor="#C5A059"
                />
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="600" color="gray.600" mb={1} textTransform="uppercase" letterSpacing="wide">
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="#C5A059"
                />
              </Box>

              <Button
                type="submit"
                colorScheme="brown" // Assuming brown exists or using custom colors
                bg="#3D2010"
                color="white"
                w="100%"
                py={6}
                _hover={{ bg: '#000' }}
                isLoading={false} // we use dispatch(setLoading) logic but Button can use prop
              >
                Login to Dashboard
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
