import React, { useState, useEffect } from "react";
import {
  Box, Text, VStack, HStack, Heading,
  ChakraProvider, Portal, Input, Button, Spinner, CloseButton
} from "@chakra-ui/react";
import BookingTheme from "./BookingForm/BookingTheme";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BookingFormModal = ({
  isOpen,
  onClose,
  initialRoomType = "Classic",
  initialRoomName = ""
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
  const [resortId, setResortId] = useState("");
  const [bookedRanges, setBookedRanges] = useState([]);

  useEffect(() => {
    if (resortId && formData.roomType) {
      axios.get(`${API_BASE}/bookings/availability/${resortId}/${encodeURIComponent(formData.roomType)}`)
        .then(res => setBookedRanges(res.data))
        .catch(err => console.error("Failed to fetch availability ranges:", err));
    }
  }, [resortId, formData.roomType]);

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const res = await axios.get(`${API_BASE}/resorts`);
        if (res.data && res.data.length > 0) {
          setResortId(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch resort info:", err);
      }
    };
    fetchResort();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setAvailabilityError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialRoomType) {
      setFormData(prev => ({ ...prev, roomType: initialRoomType }));
    }
  }, [initialRoomType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateBill = () => {
    const prices = {
      "Classic": 2500,
      "Executive": 4000,
      "Cottage/Villa": 6000,
      "Suite": 8000
    };
    
    const capacity = 2; 
    const totalGuests = (parseInt(formData.adults) || 1) + (parseInt(formData.children) || 0);
    const numRoomsNeeded = Math.ceil(totalGuests / capacity);

    const pricePerNight = prices[formData.roomType] || 2500;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? (diffDays * pricePerNight * numRoomsNeeded) : 0;
  };

  const checkAvailability = async () => {
    setLoading(true);
    setAvailabilityError("");
    try {
      if (!resortId) {
        setAvailabilityError("Resort information is loading. Please wait.");
        return false;
      }
      const response = await axios.get(`${API_BASE}/bookings/availability/${resortId}/${encodeURIComponent(formData.roomType)}`);
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
      if (!resortId) throw new Error("Resort ID not found");

      if (method === 'online') {
        // 1. Create Razorpay Order
        const orderRes = await axios.post(`${API_BASE}/payments/order`, {
          amount: totalBill,
          receipt: `rcpt_${Date.now()}`
        });

        const order = orderRes.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_mock_key",
          amount: order.amount,
          currency: "INR",
          name: "Yash Resort",
          description: `Booking for ${formData.roomType}`,
          order_id: order.id,
          handler: async (response) => {
            // 2. Verify Payment
            try {
              const verifyRes = await axios.post(`${API_BASE}/payments/verify`, response);
              if (verifyRes.data.success) {
                // 3. Finalize Booking
                const payload = {
                  ...formData,
                  resortId,
                  totalAmount: totalBill,
                  paymentMethod: 'Online',
                  paymentStatus: 'paid',
                  bookingStatus: 'confirmed',
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id
                };
                await axios.post(`${API_BASE}/bookings`, payload);
                alert("Payment successful! Your sanctuary is booked.");
                onClose();
              }
            } catch (err) {
              alert("Payment verification failed. Please contact support.",err.message);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: { color: "#D4AF37" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Cash payment flow
        const payload = {
          ...formData,
          resortId,
          totalAmount: totalBill,
          paymentMethod: 'Cash',
          paymentStatus: 'pending',
          bookingStatus: 'confirmed'
        };
        await axios.post(`${API_BASE}/bookings`, payload);
        alert("Your sanctuary is reserved! Please pay at the counter upon arrival.");
        onClose();
      }
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
          position="fixed" inset="0" zIndex={200} bg="rgba(0,0,0,0.7)"
          style={{ backdropFilter: "blur(8px)" }} onClick={onClose}
        />
        <Box
          position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)"
          zIndex={201} w="full" maxW="lg" maxH="90vh" overflowY={step === 1 ? "auto" : "hidden"}
          bg="white" borderRadius="2xl" boxShadow="0 20px 50px rgba(0, 0, 0, 0.1)" border="1px solid"
          borderColor="#D4AF37"
        >
          <CloseButton
            position="absolute" right="15px" top="15px" zIndex={210}
            color="#D4AF37" onClick={onClose}
          />

          <Box p={{ base: 6, md: 10 }}>
            <VStack gap={2} mb={8} textAlign="center">
              <Text color="#D4AF37" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="4px">
                {step === 1 ? "Reserve Your Stay" : step === 2 ? "Verify Details" : "Complete Payment"}
              </Text>
              <Heading fontSize="3xl" fontWeight="400" color="#1a1a1a">
                {step === 1 ? "Booking Details" : step === 2 ? "Review Sanctuary" : "Payment Gateway"}
              </Heading>
              {initialRoomName && <Text color="gray.500" fontSize="sm">{initialRoomName}</Text>}
            </VStack>

            {step === 1 && (
              <VStack gap={4} align="stretch">
                <HStack gap={4}>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Full Name *</Text>
                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" _focus={{ borderColor: "#D4AF37", boxShadow: "0 0 0 1px #D4AF37" }} />
                  </Box>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Phone *</Text>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 ..." _focus={{ borderColor: "#D4AF37", boxShadow: "0 0 0 1px #D4AF37" }} />
                  </Box>
                </HStack>
                <Box>
                  <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Email *</Text>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" _focus={{ borderColor: "#D4AF37", boxShadow: "0 0 0 1px #D4AF37" }} />
                </Box>
                <Box>
                  <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1} textAlign="center">Select Stay Dates *</Text>
                  <Box display="flex" justifyContent="center">
                    <DatePicker
                      selected={formData.checkIn ? new Date(formData.checkIn) : null}
                      onChange={(dates) => {
                        const [start, end] = dates;
                        setFormData(prev => ({
                          ...prev,
                          checkIn: start ? start.toLocaleDateString('en-CA') : "",
                          checkOut: end ? end.toLocaleDateString('en-CA') : ""
                        }));
                      }}
                      startDate={formData.checkIn ? new Date(formData.checkIn) : null}
                      endDate={formData.checkOut ? new Date(formData.checkOut) : null}
                      selectsRange
                      inline
                      minDate={new Date()}
                      excludeDateIntervals={bookedRanges.map(r => ({
                        start: new Date(r.checkIn),
                        end: new Date(r.checkOut)
                      }))}
                    />
                  </Box>
                </Box>
                <HStack gap={4}>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Adults</Text>
                    <Input name="adults" type="number" value={formData.adults} onChange={handleInputChange} _focus={{ borderColor: "#D4AF37", boxShadow: "0 0 0 1px #D4AF37" }} />
                  </Box>
                  <Box w="full">
                    <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Children</Text>
                    <Input name="children" type="number" value={formData.children} onChange={handleInputChange} _focus={{ borderColor: "#D4AF37", boxShadow: "0 0 0 1px #D4AF37" }} />
                  </Box>
                </HStack>
                <Box>
                  <Text as="label" display="block" fontSize="xs" fontWeight="700" color="gray.500" mb={1}>Special Requests</Text>
                  <textarea 
                    name="specialRequests" 
                    value={formData.specialRequests} 
                    onChange={handleInputChange} 
                    placeholder="Anything else we should know?"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px",
                      outline: "none",
                      minHeight: "80px",
                      resize: "none"
                    }}
                  />
                </Box>

                {availabilityError && (
                  <Text color="red.500" fontSize="xs" textAlign="center" fontWeight="600">{availabilityError}</Text>
                )}

                <Button
                  bg="#D4AF37" color="white" _hover={{ bg: "#1a1a1a" }}
                  py={6} mt={4} onClick={nextStep} disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Proceed to Review"}
                </Button>
              </VStack>
            )}

            {step === 2 && (
              <VStack gap={6} align="stretch">
                <Box bg="#FDFBEE" p={6} borderRadius="xl" border="1px solid" borderColor="rgba(212,175,55,0.3)">
                  <VStack align="start" gap={3}>
                    <Text fontWeight="700" color="#D4AF37" textTransform="uppercase" fontSize="xs">Guest Information</Text>
                    <Box h="1px" w="full" bg="#D4AF37" opacity={0.2} mb={3} />
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
                  <Text fontSize="2xl" fontWeight="700" color="#1a1a1a">₹{totalBill}</Text>
                </HStack>

                <HStack gap={4} justify="center">
                  <Button variant="outline" borderColor="#D4AF37" color="#D4AF37" flex="1" maxW="200px" py={6} onClick={() => setStep(1)}>Back</Button>
                  <Button bg="#D4AF37" color="white" _hover={{ bg: "#1a1a1a" }} flex="1" maxW="200px" py={6} onClick={nextStep}>Confirm Details</Button>
                </HStack>
              </VStack>
            )}

            {step === 3 && (
              <VStack gap={6} align="stretch">
                <Box textAlign="center" mb={4}>
                  <Text fontSize="sm" color="gray.500">Please select your preferred payment method to secure your sanctuary.</Text>
                </Box>

                <Button
                  variant="outline" borderColor="#D4AF37" color="#D4AF37"
                  py={6} onClick={() => submitBooking('cash')} disabled={loading}
                >
                  Cash on Check-in (Pay at Counter)
                </Button>

                <Box h="1px" w="full" bg="#D4AF37" opacity={0.2} />

                <Button
                  bg="#D4AF37" color="white" _hover={{ bg: "#1a1a1a" }}
                  py={6} onClick={() => submitBooking('online')} disabled={loading}
                >
                  Pay Now via RazorPay
                </Button>

                <Button variant="ghost" color="gray.400" fontSize="xs" onClick={() => setStep(2)}>Back to Review</Button>
              </VStack>
            )}
          </Box>
          <Box h="6px" w="full" bgGradient="to-r" gradientFrom="rgba(212,175,55,0.1)" gradientVia="#D4AF37" gradientTo="rgba(212,175,55,0.1)" opacity={0.4} />
        </Box>
      </Portal>
    </ChakraProvider>
  );
};

export default BookingFormModal;
