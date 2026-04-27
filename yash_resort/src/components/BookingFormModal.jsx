import React, { useState, useEffect } from "react";
import {
  Box, IconButton, Text, VStack, HStack, Heading,
  ChakraProvider, Portal, Input, Button, Spinner, CloseButton
} from "@chakra-ui/react";
import BookingTheme from "./BookingForm/BookingTheme";
import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Adjust to your backend port

const BookingFormModal = ({
  isOpen,
  onClose,
  initialRoomType = "Classic"
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    roomType: initialRoomType,
    checkIn: "",
    checkOut: "",
    specialRequests: "",
  });
  const [totalBill, setTotalBill] = useState(0);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setAvailabilityError("");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateBill = () => {
    // Basic price mapping - In production, this comes from backend /api/rooms
    const prices = {
      "Classic": 5000,
      "Executive": 8000,
      "Cottage/Villa": 15000,
      "Suite": 25000
    };
    const pricePerNight = prices[formData.roomType] || 5000;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * pricePerNight : 0;
  };

  const checkAvailability = async () => {
    setLoading(true);
    setAvailabilityError("");
    try {
      const { resortId } = JSON.parse(localStorage.getItem('currentResort') || '{"resortId":"6747b1f8e4b0f7a1c1d2e3f4"}'); // Fallback ID
      const response = await axios.get(`${API_BASE}/bookings/availability/${resortId}/${formData.roomType}`);
      const ranges = response.data;

      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);

      const isOverlap = ranges.some(range => {
        const rIn = new Date(range.checkIn);
        const rOut = new Date(range.checkOut);
        return (checkIn < rOut && checkOut > rIn);
      });

      if (isOverlap) {
        setAvailabilityError("Selected dates are not available for this room category.");
        return false;
      }
      return true;
    } catch (err) {
      setAvailabilityError("Could not verify availability. Please try again.",err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.checkIn || !formData.checkOut) {
        alert("Please fill in all required fields.");
        return;
      }
      const available = await checkAvailability();
      if (!available) return;

      setTotalBill(calculateBill());
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const submitBooking = async (method) => {
    setLoading(true);
    try {
      const { resortId } = JSON.parse(localStorage.getItem('currentResort') || '{"resortId":"6747b1f8e4b0f7a1c1d2e3f4"}');

      const payload = {
        ...formData,
        resortId,
        totalAmount: totalBill,
        paymentMethod: method === 'online' ? 'Online' : 'Cash',
        paymentStatus: method === 'online' ? 'paid' : 'pending',
        bookingStatus: 'confirmed'
      };

      await axios.post(`${API_BASE}/bookings`, payload);

      alert("Your sanctuary is booked! A confirmation email and SMS have been sent.");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ChakraProvider value={BookingTheme}>
      <Portal>
        <Box
          position="fixed" inset="0" zIndex={200} bg="blackAlpha.700"
          backdropFilter="blur(8px)" onClick={onClose} transition="all 0.3s ease"
        />
        <Box
          position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)"
          zIndex={201} w="full" maxW="lg" maxH="90vh" overflowY="auto"
          bg="white" borderRadius="2xl" boxShadow="luxury" border="1px solid"
          borderColor="luxury.gold"
        >
          <CloseButton
            position="absolute" right="15px" top="15px" zIndex={210}
            color="luxury.gold" fontSize="24px" onClick={onClose}
          />

          <Box p={{ base: 6, md: 10 }}>
            <VStack gap={2} mb={8} textAlign="center">
              <Text color="luxury.gold" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="4px">
                {step === 1 ? "Reserve Your Stay" : step === 2 ? "Verify Details" : "Complete Payment"}
              </Text>
              <Heading fontFamily="heading" fontSize="3xl" fontWeight="400" color="luxury.dark">
                {step === 1 ? "Booking Details" : step === 2 ? "Review Sanctuary" : "Payment Gateway"}
              </Heading>
            </VStack>

            {step === 1 && (
              <VStack gap={4} align="stretch">
                <HStack gap={4}>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Full Name *</Text>
                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" focusBorderColor="luxury.gold" />
                  </Box>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Phone *</Text>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 ..." focusBorderColor="luxury.gold" />
                  </Box>
                </HStack>
                <Box>
                  <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Email *</Text>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" focusBorderColor="luxury.gold" />
                </Box>
                <HStack gap={4}>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Check-in *</Text>
                    <Input name="checkIn" type="date" value={formData.checkIn} onChange={handleInputChange} focusBorderColor="luxury.gold" />
                  </Box>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Check-out *</Text>
                    <Input name="checkOut" type="date" value={formData.checkOut} onChange={handleInputChange} focusBorderColor="luxury.gold" />
                  </Box>
                </HStack>
                <HStack gap={4}>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Adults</Text>
                    <Input name="adults" type="number" value={formData.adults} onChange={handleInputChange} />
                  </Box>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Children</Text>
                    <Input name="children" type="number" value={formData.children} onChange={handleInputChange} />
                  </Box>
                </HStack>

                {availabilityError && (
                  <Text color="red.500" fontSize="xs" textAlign="center" fontWeight="600">{availabilityError}</Text>
                )}

                <Button
                  bg="luxury.gold" color="white" _hover={{ bg: "luxury.dark" }}
                  py={6} mt={4} onClick={nextStep} isDisabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Proceed to Review"}
                </Button>
              </VStack>
            )}

            {step === 2 && (
              <VStack gap={6} align="stretch">
                <Box bg="luxury.cream" p={6} borderRadius="xl" border="1px solid" borderColor="luxury.gold/30">
                  <VStack align="start" gap={3}>
                    <Text fontWeight="700" color="luxury.gold" textTransform="uppercase" fontSize="xs">Guest Information</Text>
                    <Box h="1px" w="full" bg="luxury.gold" opacity={0.2} mb={3} />
                    <Text fontSize="sm"><strong>Name:</strong> {formData.name}</Text>
                    <Text fontSize="sm"><strong>Email:</strong> {formData.email}</Text>
                    <Text fontSize="sm"><strong>Phone:</strong> {formData.phone}</Text>
                    <Text fontSize="sm"><strong>Stay:</strong> {formData.checkIn} to {formData.checkOut}</Text>
                    <Text fontSize="sm"><strong>Guests:</strong> {formData.adults} Adults, {formData.children} Children</Text>
                    <Text fontSize="sm"><strong>Room Type:</strong> {formData.roomType}</Text>
                  </VStack>
                </Box>

                <HStack justify="space-between" px={2}>
                  <Text fontSize="lg" color="gray.600">Total Payable</Text>
                  <Text fontSize="2xl" fontWeight="700" color="luxury.dark">₹{totalBill}</Text>
                </HStack>

                <HStack gap={4}>
                  <Button variant="outline" borderColor="luxury.gold" color="luxury.gold" w="full" onClick={() => setStep(1)}>Back</Button>
                  <Button bg="luxury.gold" color="white" _hover={{ bg: "luxury.dark" }} w="full" py={6} onClick={nextStep}>Confirm Details</Button>
                </HStack>
              </VStack>
            )}

            {step === 3 && (
              <VStack gap={6} align="stretch">
                <Box textAlign="center" mb={4}>
                  <Text fontSize="sm" color="gray.500">Please select your preferred payment method to secure your sanctuary.</Text>
                </Box>

                <Button
                  variant="outline" borderColor="luxury.gold" color="luxury.gold"
                  py={6} onClick={() => submitBooking('cash')} isDisabled={loading}
                >
                  Cash on Check-in (Pay at Counter)
                </Button>

                <Box h="1px" w="full" bg="luxury.gold" opacity={0.2} />

                <Button
                  bg="luxury.gold" color="white" _hover={{ bg: "luxury.dark" }}
                  py={6} onClick={() => submitBooking('online')} isDisabled={loading}
                >
                  Pay Now via RazorPay
                </Button>

                <Button variant="ghost" color="gray.400" fontSize="xs" onClick={() => setStep(2)}>Back to Review</Button>
              </VStack>
            )}
          </Box>
          <Box h="6px" w="full" bgGradient="to-r" gradientFrom="luxury.gold/10" gradientVia="luxury.gold" gradientTo="luxury.gold/10" opacity={0.4} />
        </Box>
      </Portal>
    </ChakraProvider>
  );
};

export default BookingFormModal;
