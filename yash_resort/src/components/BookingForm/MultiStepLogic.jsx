import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  ChakraProvider,
  VStack,
  HStack,
  Circle
} from '@chakra-ui/react';
import Step1Details from './Step1Details';
import Step2Review from './Step2Review';
import Step3Confirmation from './Step3Confirmation';
import axios from 'axios';
import BookingTheme from './BookingTheme';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const MotionBox = motion.div;

export const Stepper = ({ step }) => {
  const steps = [
    { id: 1, label: 'Stay Info', description: 'Personal & stay details' },
    { id: 2, label: 'Verification', description: 'Review & payment' },
    { id: 3, label: 'Confirm', description: 'Booking success' }
  ];

  return (
    <Box w="full" py={6} px={4} mb={4}>
      <Box position="relative" maxW="2xl" mx="auto">
        {/* Connection Lines */}
        <Box 
          position="absolute" 
          top="20px" 
          left="16.6%" 
          right="16.6%" 
          h="1px" 
          bg="gray.100" 
          zIndex={0} 
        />
        <motion.div 
          style={{
            position: 'absolute',
            top: '20px',
            left: '16.6%',
            height: '1px',
            backgroundColor: '#D4AF37',
            zIndex: 1
          }}
          initial={false}
          animate={{ width: `${(step - 1) * 33.3 * 2}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <Flex justify="space-between" align="start" position="relative" zIndex={10}>
          {steps.map((s) => (
            <VStack key={s.id} flex={1} gap={3} position="relative">
              <Circle
                size="40px"
                bg={step >= s.id ? 'luxury.gold' : 'white'}
                border="1px solid"
                borderColor={step >= s.id ? 'luxury.gold' : 'gray.200'}
                color={step >= s.id ? 'white' : 'gray.400'}
                boxShadow={step === s.id ? 'gold' : 'none'}
                transition="all 0.4s ease"
              >
                {step > s.id ? <Check size={18} strokeWidth={3} /> : <Text fontWeight="700" fontSize="14px">{s.id}</Text>}
              </Circle>
              <VStack gap={0.5} textAlign="center">
                <Text 
                  fontSize="11px" 
                  fontWeight="700" 
                  textTransform="uppercase" 
                  letterSpacing="2px"
                  color={step >= s.id ? 'luxury.dark' : 'gray.400'}
                >
                  {s.label}
                </Text>
                <Text fontSize="9px" color="gray.400" display={{ base: 'none', md: 'block' }}>
                  {s.description}
                </Text>
              </VStack>
            </VStack>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const MultiStepLogic = ({ initialData = {}, onComplete = () => {} }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    resortId: '',
    roomType: '',
    guests: 1,
    checkIn: null,
    checkOut: null,
    totalAmount: 0,
    paymentMethod: 'pay_now',
    paymentStatus: 'pending',
    bookingStatus: 'confirmed',
    ...initialData
  });

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => s - 1), []);

  const updateFormData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleBookingSubmit = async (finalData) => {
    setLoading(true);
    try {
      const payload = {
        name: finalData.name,
        phone: finalData.phone,
        email: finalData.email,
        resortId: finalData.resortId,
        roomType: finalData.roomType,
        checkIn: finalData.checkIn ? new Date(finalData.checkIn).toISOString() : null,
        checkOut: finalData.checkOut ? new Date(finalData.checkOut).toISOString() : null,
        guests: finalData.guests,
        totalAmount: finalData.totalAmount,
        paymentMethod: finalData.paymentMethod,
        paymentStatus: finalData.paymentStatus || 'pending',
        bookingStatus: 'confirmed'
      };

      const response = await axios.post(`${API_BASE_URL}/bookings`, payload);
      if (response.status === 201 || response.status === 200) {
        const savedBooking = response.data.booking || response.data;
        setFormData((prev) => ({ 
          ...prev, 
          ...savedBooking, 
          bookingId: savedBooking._id || savedBooking.bookingId 
        }));
        nextStep();
        onComplete(savedBooking);
      }
    } catch (error) {
      console.error('Booking Failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider value={BookingTheme}>
      <Box 
        position="relative" 
        w="full" 
        bg="white" 
        borderRadius="xl"
      >
        <Stepper step={step} />
        
        <Box 
          position="relative" 
          mt={4} 
          minH="450px" 
          paddingX={{ base: 4, md: 8 }}
          paddingBottom={8}
        >
          {step > 1 && step < 3 && (
            <Box
              position="absolute"
              top="-70px"
              left={{ base: "4", md: "8" }}
              zIndex={20}
            >
              <IconButton
                aria-label="Go back"
                variant="ghost"
                onClick={prevStep}
                color="luxury.dark"
                _hover={{ bg: 'brand.50', color: 'luxury.gold' }}
                borderRadius="full"
                size="md"
              >
                <ChevronLeft size={24} />
              </IconButton>
            </Box>
          )}

          <AnimatePresence mode="wait">
            <MotionBox
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {step === 1 && (
                <Step1Details
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                />
              )}
              {step === 2 && (
                <Step2Review
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleBookingSubmit}
                  loading={loading}
                />
              )}
              {step === 3 && (
                <Step3Confirmation formData={formData} />
              )}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MultiStepLogic;
