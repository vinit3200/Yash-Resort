import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Text,
  Spinner,
  HStack,
  Icon,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { parseISO } from 'date-fns';
import { AlertTriangle, User, Mail, Phone, Users, MapPin, Calendar } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const LuxuryLabel = ({ label, required, icon: IconComponent }) => (
  <HStack mb={2} gap={2}>
    {IconComponent && <Icon as={IconComponent} size={14} color="luxury.gold" opacity={0.7} />}
    <Text fontSize="10px" fontWeight="700" textTransform="uppercase" letterSpacing="2px" color="gray.500">
      {label} {required && <Text as="span" color="luxury.gold">*</Text>}
    </Text>
  </HStack>
);

const LuxuryInput = ({ value, onChange, placeholder, type, ...props }) => (
  <Box
    as="input"
    w="100%"
    paddingY={3}
    borderBottom="1px solid"
    borderColor="gray.200"
    bg="transparent"
    outline="none"
    fontSize="sm"
    fontWeight="500"
    color="luxury.dark"
    transition="all 0.3s ease"
    _placeholder={{ color: 'gray.300', fontWeight: '400' }}
    _focus={{ borderColor: "luxury.gold", borderBottomWidth: "2px" }}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    {...props}
  />
);

const LuxurySelect = ({ value, onChange, children, disabled, ...props }) => (
  <Box
    as="select"
    w="100%"
    paddingY={3}
    borderBottom="1px solid"
    borderColor="gray.200"
    bg="transparent"
    outline="none"
    fontSize="sm"
    fontWeight="500"
    color="luxury.dark"
    cursor={disabled ? "not-allowed" : "pointer"}
    opacity={disabled ? 0.6 : 1}
    transition="all 0.3s ease"
    _focus={{ borderColor: "luxury.gold", borderBottomWidth: "2px" }}
    value={value}
    onChange={onChange}
    disabled={disabled}
    {...props}
  >
    {children}
  </Box>
);

const NumberControl = ({ value, onChange, min, max }) => {
  const numValue = parseInt(value) || 1;
  return (
    <Flex align="center" borderBottom="1px solid" borderColor="gray.200" py={1}>
      <Box
        as="button"
        size="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={() => onChange(Math.max(min, numValue - 1).toString())}
        _hover={{ color: 'luxury.gold' }}
        fontSize="xl"
      >
        −
      </Box>
      <Text flex="1" textAlign="center" fontWeight="600" fontSize="md">{value}</Text>
      <Box
        as="button"
        size="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={() => onChange(Math.min(max, numValue + 1).toString())}
        _hover={{ color: 'luxury.gold' }}
        fontSize="xl"
      >
        +
      </Box>
    </Flex>
  );
};

const Step1Details = ({ formData, updateFormData, onNext }) => {
  const [resorts, setResorts] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/resorts`);
        setResorts(res.data);
      } catch {
        setResorts([
          { _id: '1', name: 'Ashoka Grand Resort' },
          { _id: '2', name: 'Emerald Bay Resort' },
        ]);
      }
    };
    fetchResorts();
  }, []);

  useEffect(() => {
    if (formData.resortId) {
      const fetchRoomTypes = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/rooms?resortId=${formData.resortId}`);
          setRoomTypes(res.data);
        } catch {
          setRoomTypes([
            { _id: 'r1', type: 'Deluxe Room', price: 5000 },
            { _id: 'r2', type: 'Luxury Suite', price: 12000 },
          ]);
        }
      };
      fetchRoomTypes();
    }
  }, [formData.resortId]);

  useEffect(() => {
    if (formData.resortId && formData.roomType) {
      const fetchRoomPrice = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/rooms?resortId=${formData.resortId}`);
          const rooms = res.data;
          const matchingRoom = rooms.find(r => r.category === formData.roomType);
          if (matchingRoom) {
            updateFormData({ pricePerNight: matchingRoom.price });
          }
        } catch (err) {
          console.error("Error fetching room price:", err);
        }
      };
      fetchRoomPrice();
    }
  }, [formData.resortId, formData.roomType, updateFormData]);

  useEffect(() => {
    if (formData.resortId && formData.roomType) {
      const fetchAvailability = async () => {
        setLoadingDates(true);
        try {
          const res = await axios.get(`${API_BASE_URL}/availability`, {
            params: { resortId: formData.resortId, roomType: formData.roomType }
          });
          const { totalRooms, bookedRanges } = res.data;
          setUnavailableDates(bookedRanges || []);
          updateFormData({ totalCategoryRooms: totalRooms });
        } catch {
          setUnavailableDates([]);
        } finally {
          setLoadingDates(false);
        }
      };
      fetchAvailability();
    }
  }, [formData.resortId, formData.roomType, updateFormData]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      const isRangeUnavailable = unavailableDates.some(range => {
        const rangeStart = parseISO(range.checkIn);
        const rangeEnd = parseISO(range.checkOut);
        return (start >= rangeStart && start <= rangeEnd) || (end >= rangeStart && end <= rangeEnd);
      });
      if (isRangeUnavailable) {
        setError("Selected dates contain unavailable periods. Please choose different dates.");
        return;
      }
    }
    setError('');
    updateFormData({ checkIn: start, checkOut: end });
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.phone) return "Please fill in personal details";
    if (!formData.resortId || !formData.roomType) return "Please select resort and room type";
    if (!formData.checkIn || !formData.checkOut) return "Please select stay dates";
    return null;
  };

  const handleNext = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    onNext();
  };

  return (
    <VStack gap={10} align="stretch">
      <Box>
        <Text fontSize="xs" fontWeight="700" color="luxury.gold" textTransform="uppercase" letterSpacing="4px" mb={6}>
          01. Guest Details
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <Box>
            <LuxuryLabel label="Full Name" required icon={User} />
            <LuxuryInput
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
            />
          </Box>
          <Box>
            <LuxuryLabel label="Email Address" required icon={Mail} />
            <LuxuryInput
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
          </Box>
          <Box>
            <LuxuryLabel label="Phone Number" required icon={Phone} />
            <LuxuryInput
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
            />
          </Box>
          <Box>
            <LuxuryLabel label="Number of Guests" required icon={Users} />
            <NumberControl
              min={1}
              max={10}
              value={formData.guests}
              onChange={(val) => updateFormData({ guests: parseInt(val) || 1 })}
            />
          </Box>
        </SimpleGrid>
      </Box>

      <Box>
        <Text fontSize="xs" fontWeight="700" color="luxury.gold" textTransform="uppercase" letterSpacing="4px" mb={6}>
          02. Accommodation
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <Box>
            <LuxuryLabel label="Select Resort" required icon={MapPin} />
            <LuxurySelect
              value={formData.resortId}
              onChange={(e) => updateFormData({ resortId: e.target.value, roomType: '', pricePerNight: 0 })}
            >
              <option value="">Choose a destination</option>
              {resorts.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
            </LuxurySelect>
          </Box>
          <Box>
            <LuxuryLabel label="Room Type" required icon={MapPin} />
            <LuxurySelect
              value={formData.roomType}
              onChange={(e) => {
                const selectedRoom = roomTypes.find(r => r.type === e.target.value);
                updateFormData({ roomType: e.target.value, pricePerNight: selectedRoom?.price || 0 });
              }}
              disabled={!formData.resortId}
            >
              <option value="">Choose room type</option>
              {roomTypes.map(r => <option key={r._id} value={r.type}>{r.type} - ₹{r.price}/night</option>)}
            </LuxurySelect>
          </Box>
        </SimpleGrid>
      </Box>

      <Box>
        <LuxuryLabel label="Select Dates" required icon={Calendar} />
        <Box
          padding={4}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.100"
          position="relative"
        >
          {loadingDates ? (
            <HStack py={10} justify="center" gap={3}><Spinner size="md" color="luxury.gold" /><Text fontWeight="500">Checking availability...</Text></HStack>
          ) : (
            <DatePicker
              selected={formData.checkIn}
              onChange={handleDateChange}
              startDate={formData.checkIn}
              endDate={formData.checkOut}
              selectsRange
              minDate={new Date()}
              excludeDateIntervals={unavailableDates.map(range => ({
                start: parseISO(range.checkIn),
                end: parseISO(range.checkOut)
              }))}
              inline
              calendarClassName="luxury-calendar"
            />
          )}
        </Box>
      </Box>

      <Global styles={`
        .luxury-calendar {
          border: none !important;
          font-family: 'Inter', sans-serif !important;
          width: 100% !important;
          background: transparent !important;
        }
        .react-datepicker {
          display: flex !important;
          justify-content: center;
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        .react-datepicker__header {
          background-color: transparent !important;
          border-bottom: 1px solid #eee !important;
          padding-bottom: 15px !important;
        }
        .react-datepicker__current-month {
          font-family: 'Playfair Display', serif !important;
          font-size: 1.1rem !important;
          color: #1a1a1a !important;
          letter-spacing: 1px !important;
        }
        .react-datepicker__day-name {
          color: #D4AF37 !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          font-size: 0.7rem !important;
          letter-spacing: 1px !important;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-range {
          background-color: #D4AF37 !important;
          color: white !important;
          border-radius: 50% !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #1a1a1a !important;
          color: white !important;
          border-radius: 50% !important;
        }
        .react-datepicker__day:hover {
          border-radius: 50% !important;
          background-color: #f0f0f0 !important;
        }
      `} />

      {error && (
        <Flex
          bg="red.50"
          padding={4}
          borderRadius="lg"
          border="1px solid"
          borderColor="red.100"
          align="center"
          gap={3}
        >
          <Icon as={AlertTriangle} color="red.500" boxSize={5} />
          <Text color="red.700" fontSize="sm" fontWeight="500">{error}</Text>
        </Flex>
      )}

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
        onClick={loadingDates ? undefined : handleNext}
        opacity={loadingDates ? 0.6 : 1}
        transition="all 0.4s ease"
        _hover={{ bg: loadingDates ? "luxury.dark" : "luxury.gold", transform: 'translateY(-2px)', boxShadow: 'xl' }}
        _active={{ transform: 'translateY(0)' }}
      >
        Proceed to Review
      </Box>
    </VStack>
  );
};

export default Step1Details;