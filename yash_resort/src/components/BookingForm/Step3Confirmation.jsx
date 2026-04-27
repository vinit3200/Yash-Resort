import React, { useMemo, useState } from 'react';
import { VStack, Text, Box, Flex, HStack, Icon, Circle } from '@chakra-ui/react';
import { Check, Calendar, MapPin, User, Mail, Phone, CreditCard, Download, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const InfoRow = ({ label, value, icon: IconComponent }) => (
  <Flex justify="space-between" align="center" py={2}>
    <HStack gap={3}>
      {IconComponent && <Icon as={IconComponent} size={14} color="luxury.gold" opacity={0.6} />}
      <Text fontSize="10px" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.400">{label}</Text>
    </HStack>
    <Text fontWeight="600" fontSize="xs" color="luxury.dark">{value}</Text>
  </Flex>
);

const Step3Confirmation = ({ formData }) => {
  const navigate = useNavigate();
  const [bookingId] = useState(() => formData.bookingId || `ASH${Math.floor(Math.random() * 90000) + 10000}`);

  const nights = useMemo(() => {
    return formData.nights || (formData.checkIn && formData.checkOut
      ? Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
      : 0);
  }, [formData.nights, formData.checkIn, formData.checkOut]);

  return (
    <VStack gap={10} align="center" py={6}>
      <MotionDiv
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
      >
        <Circle size="80px" bg="green.50" border="2px solid" borderColor="green.200">
          <Icon as={Check} w={10} h={10} color="green.500" strokeWidth={3} />
        </Circle>
      </MotionDiv>

      <VStack gap={3} textAlign="center">
        <Text fontFamily="heading" fontSize="3xl" color="luxury.dark">Reservation <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Confirmed</span></Text>
        <Text color="gray.500" fontSize="sm" maxW="320px" mx="auto" lineHeight="relaxed">
          Your sanctuary at Ashoka Hospitality is secured. We look forward to welcoming you.
        </Text>
        <Box 
          paddingX={4} 
          paddingY={1.5} 
          bg="brand.50" 
          borderRadius="full" 
          border="1px solid" 
          borderColor="luxury.gold"
          mt={2}
        >
          <Text fontWeight="700" color="luxury.gold" fontSize="xs" letterSpacing="2px">
            ID: #{bookingId}
          </Text>
        </Box>
      </VStack>

      <Box 
        w="100%" 
        bg="white" 
        padding={8} 
        borderRadius="2xl" 
        border="1px solid" 
        borderColor="gray.100" 
        boxShadow="luxury"
        position="relative"
      >
        <VStack align="stretch" gap={4}>
          <Text fontSize="10px" fontWeight="800" textTransform="uppercase" letterSpacing="3px" color="luxury.gold" mb={2}>
            Booking Summary
          </Text>

          <InfoRow 
            label="Duration" 
            value={`${nights} Luxury Nights`} 
            icon={Calendar} 
          />
          <InfoRow 
            label="Dates" 
            value={`${formData.checkIn && format(new Date(formData.checkIn), 'MMM dd')} - ${formData.checkOut && format(new Date(formData.checkOut), 'MMM dd, yyyy')}`} 
            icon={Calendar} 
          />
          <InfoRow 
            label="Room" 
            value={formData.roomType} 
            icon={MapPin} 
          />
          <InfoRow 
            label="Total Amount" 
            value={`₹${formData.totalAmount?.toLocaleString()}`} 
            icon={CreditCard} 
          />
          
          <Box h="1px" bg="gray.50" my={2} />
          
          <Text fontSize="10px" fontWeight="800" textTransform="uppercase" letterSpacing="3px" color="luxury.gold" mb={2}>
            Guest Details
          </Text>

          <InfoRow label="Guest" value={formData.name} icon={User} />
          <InfoRow label="Email" value={formData.email} icon={Mail} />
          <InfoRow label="Phone" value={formData.phone} icon={Phone} />

          <Box 
            mt={4}
            padding={3} 
            bg={formData.paymentStatus === 'paid' ? 'green.50' : 'orange.50'} 
            borderRadius="md"
            textAlign="center"
          >
            <Text fontSize="xs" fontWeight="700" color={formData.paymentStatus === 'paid' ? 'green.700' : 'orange.700'} textTransform="uppercase" letterSpacing="1px">
              {formData.paymentStatus === 'paid' ? '✨ Payment Successfully Processed' : '⏳ Payment Pending at Check-in'}
            </Text>
          </Box>
        </VStack>
      </Box>

      <VStack w="100%" gap={4}>
        <Box
          as="button"
          w="100%"
          padding={5}
          bg="luxury.dark"
          color="white"
          textAlign="center"
          cursor="pointer"
          fontWeight="700"
          textTransform="uppercase"
          fontSize="xs"
          letterSpacing="4px"
          onClick={() => navigate('/')}
          transition="all 0.3s ease"
          _hover={{ bg: 'luxury.gold', transform: 'translateY(-2px)' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          Return Home <Icon as={ArrowRight} size={14} />
        </Box>
        <Box
          as="button"
          w="100%"
          padding={5}
          border="1px solid"
          borderColor="luxury.dark"
          color="luxury.dark"
          bg="transparent"
          textAlign="center"
          cursor="pointer"
          fontWeight="700"
          textTransform="uppercase"
          fontSize="xs"
          letterSpacing="4px"
          onClick={() => window.print()}
          transition="all 0.3s ease"
          _hover={{ bg: 'brand.50', borderColor: 'luxury.gold', color: 'luxury.gold' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          Download Invoice <Icon as={Download} size={14} />
        </Box>
      </VStack>

      <Text fontSize="10px" color="gray.400" textAlign="center" px={10} fontStyle="italic">
        A formal confirmation has been sent to your email.
      </Text>
    </VStack>
  );
};

export default Step3Confirmation;