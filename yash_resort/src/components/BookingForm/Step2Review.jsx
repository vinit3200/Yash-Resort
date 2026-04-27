import React, { useEffect } from 'react';
import { VStack, HStack, Text, Box, Flex, Icon, SimpleGrid, Badge } from '@chakra-ui/react';
import { format, differenceInDays } from 'date-fns';
import { CreditCard, Home, Calendar, Users, MapPin, Tag } from 'lucide-react';

const SummaryItem = ({ icon, label, value }) => (
  <Flex justify="space-between" align="center" py={3} borderBottom="1px solid" borderColor="gray.50">
    <HStack gap={3}>
      <Icon as={icon} color="luxury.gold" size={16} opacity={0.6} />
      <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="1px">{label}</Text>
    </HStack>
    <Text fontWeight="600" fontSize="sm" color="luxury.dark">{value}</Text>
  </Flex>
);

const Step2Review = ({ formData, updateFormData, onNext, loading }) => {
  const nights = formData.checkIn && formData.checkOut
    ? differenceInDays(new Date(formData.checkOut), new Date(formData.checkIn))
    : 0;

  const totalAmount = nights * (formData.pricePerNight || 0);

  useEffect(() => {
    updateFormData({ totalAmount });
  }, [totalAmount, updateFormData]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    let finalData = { ...formData, totalAmount };

    if (formData.paymentMethod === 'pay_now') {
      const res = await loadRazorpay();
      if (!res) {
        console.error('Razorpay SDK failed to load');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_YOUR_KEY',
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Ashoka Hospitality',
        description: `Booking for ${formData.roomType}`,
        handler: function (response) {
          finalData = {
            ...finalData,
            paymentStatus: 'paid',
            razorpayPaymentId: response.razorpay_payment_id,
            paymentMethod: 'razorpay'
          };
          onNext(finalData);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#D4AF37',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      finalData = {
        ...finalData,
        paymentStatus: 'pending',
        paymentMethod: 'pay_at_checkin'
      };
      onNext(finalData);
    }
  };

  return (
    <VStack gap={10} align="stretch">
      <Box>
        <Text fontSize="xs" fontWeight="700" color="luxury.gold" textTransform="uppercase" letterSpacing="4px" mb={6}>
          03. Review Reservation
        </Text>
        
        <Box 
          bg="white" 
          padding={8} 
          borderRadius="2xl" 
          border="1px solid" 
          borderColor="luxury.gold" 
          position="relative"
          overflow="hidden"
          boxShadow="luxury"
        >
          {/* Decorative Corner */}
          <Box position="absolute" top={0} right={0} w="100px" h="100px" bg="luxury.gold" opacity={0.03} borderRadius="0 0 0 100%" />

          <VStack gap={0} align="stretch">
            <SummaryItem icon={MapPin} label="Destination" value={formData.resortId === '1' ? 'Ashoka Grand Resort' : 'Emerald Bay Resort'} />
            <SummaryItem icon={Tag} label="Accomodation" value={formData.roomType} />
            <SummaryItem icon={Calendar} label="Period" value={`${formData.checkIn && format(new Date(formData.checkIn), 'MMM dd')} - ${formData.checkOut && format(new Date(formData.checkOut), 'MMM dd, yyyy')}`} />
            <SummaryItem icon={Tag} label="Duration" value={`${nights} Luxury Nights`} />
            <SummaryItem icon={Users} label="Guests" value={`${formData.guests} ${formData.guests > 1 ? 'Persons' : 'Person'}`} />
            
            <Box h="1px" bg="gray.100" my={6} />
            
            <Flex justify="space-between" align="end">
              <VStack align="start" gap={0}>
                <Text fontSize="10px" fontWeight="700" color="gray.400" textTransform="uppercase" letterSpacing="2px">Grand Total</Text>
                <Text fontSize="3xl" fontWeight="700" color="luxury.dark">₹{totalAmount.toLocaleString()}</Text>
              </VStack>
              <Badge colorScheme="gold" variant="subtle" paddingX={3} paddingY={1} borderRadius="full" fontSize="10px" textTransform="uppercase" letterSpacing="1px" bg="brand.50" color="luxury.gold">
                Premium Stay
              </Badge>
            </Flex>
          </VStack>
        </Box>
      </Box>

      <Box>
        <Text fontSize="xs" fontWeight="700" color="luxury.gold" textTransform="uppercase" letterSpacing="4px" mb={6}>
          04. Payment Selection
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Box
            padding={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={formData.paymentMethod === 'pay_now' ? 'luxury.gold' : 'gray.100'}
            bg={formData.paymentMethod === 'pay_now' ? 'brand.50' : 'white'}
            cursor="pointer"
            onClick={() => updateFormData({ paymentMethod: 'pay_now' })}
            transition="all 0.3s ease"
            _hover={{ borderColor: 'luxury.gold', boxShadow: 'md' }}
          >
            <HStack gap={4} align="start">
              <Circle
                size="20px"
                border="1px solid"
                borderColor={formData.paymentMethod === 'pay_now' ? 'luxury.gold' : 'gray.300'}
                bg={formData.paymentMethod === 'pay_now' ? 'luxury.gold' : 'transparent'}
                position="relative"
              >
                {formData.paymentMethod === 'pay_now' && (
                  <Box w="6px" h="6px" borderRadius="full" bg="white" />
                )}
              </Circle>
              <VStack align="start" gap={1}>
                <HStack gap={2}>
                  <CreditCard size={16} color={formData.paymentMethod === 'pay_now' ? '#D4AF37' : '#718096'} />
                  <Text fontWeight="700" fontSize="sm" color="luxury.dark">Instant Confirmation</Text>
                </HStack>
                <Text fontSize="xs" color="gray.500" leading="relaxed">Pay securely via Razorpay (Cards, UPI, Netbanking)</Text>
              </VStack>
            </HStack>
          </Box>

          <Box
            padding={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={formData.paymentMethod === 'pay_at_checkin' ? 'luxury.gold' : 'gray.100'}
            bg={formData.paymentMethod === 'pay_at_checkin' ? 'brand.50' : 'white'}
            cursor="pointer"
            onClick={() => updateFormData({ paymentMethod: 'pay_at_checkin' })}
            transition="all 0.3s ease"
            _hover={{ borderColor: 'luxury.gold', boxShadow: 'md' }}
          >
            <HStack gap={4} align="start">
              <Circle
                size="20px"
                border="1px solid"
                borderColor={formData.paymentMethod === 'pay_at_checkin' ? 'luxury.gold' : 'gray.300'}
                bg={formData.paymentMethod === 'pay_at_checkin' ? 'luxury.gold' : 'transparent'}
                position="relative"
              >
                {formData.paymentMethod === 'pay_at_checkin' && (
                  <Box w="6px" h="6px" borderRadius="full" bg="white" />
                )}
              </Circle>
              <VStack align="start" gap={1}>
                <HStack gap={2}>
                  <Home size={16} color={formData.paymentMethod === 'pay_at_checkin' ? '#D4AF37' : '#718096'} />
                  <Text fontWeight="700" fontSize="sm" color="luxury.dark">Pay at Property</Text>
                </HStack>
                <Text fontSize="xs" color="gray.500" leading="relaxed">Secure your room and pay during check-in</Text>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>
      </Box>

      <Box
        as="button"
        w="full"
        padding={5}
        bg="luxury.dark"
        color="white"
        textAlign="center"
        cursor="pointer"
        fontWeight="700"
        letterSpacing="4px"
        textTransform="uppercase"
        fontSize="xs"
        height="64px"
        onClick={loading ? undefined : handlePayment}
        opacity={loading ? 0.6 : 1}
        transition="all 0.4s ease"
        _hover={{ bg: loading ? "luxury.dark" : "luxury.gold", transform: 'translateY(-2px)', boxShadow: 'xl' }}
        _active={{ transform: 'translateY(0)' }}
      >
        {loading ? <Spinner size="sm" /> : 'Finalize Reservation'}
      </Box>
    </VStack>
  );
};

export default Step2Review;