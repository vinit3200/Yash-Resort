import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, SimpleGrid, Badge, Spinner, HStack, VStack, IconButton } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Availability = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  
  const daysToShow = 14;
  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          axios.get(`${API_BASE}/rooms`),
          axios.get(`${API_BASE}/bookings`)
        ]);
        setRooms(roomsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Failed to fetch availability data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isBooked = (roomId, date) => {
    return bookings.some(b => {
      if (b.roomId?._id !== roomId && b.roomId !== roomId) return false;
      if (b.bookingStatus === 'cancelled') return false;
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const d = new Date(date);
      d.setHours(12, 0, 0, 0);
      return d >= checkIn && d < checkOut;
    });
  };

  const shiftDate = (days) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + days);
    setStartDate(d);
  };

  if (loading) return <Flex justify="center" p={20}><Spinner color="#C5A059" /></Flex>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={10}>
        <Box>
          <Text fontFamily="'Cormorant Garamond', serif" fontSize="28px" fontWeight="600" color="#3D2010">Room Availability</Text>
          <Text fontSize="13px" color="#7A7A7A">Real-time status of all sanctuary units</Text>
        </Box>
        <HStack gap={4}>
          <IconButton onClick={() => shiftDate(-7)} aria-label="Prev week" variant="outline" borderColor="#E8E0D6"><ChevronLeft size={20} color="#3D2010" /></IconButton>
          <Text fontWeight="600" fontSize="14px" minW="150px" textAlign="center">
            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {dates[daysToShow-1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
          <IconButton onClick={() => shiftDate(7)} aria-label="Next week" variant="outline" borderColor="#E8E0D6"><ChevronRight size={20} color="#3D2010" /></IconButton>
        </HStack>
      </Flex>

      <Box bg="white" borderRadius="20px" border="1px solid" borderColor="#E8E0D6" overflow="hidden">
        <Box overflowX="auto">
          <Box minW="1000px">
            {/* Header Row */}
            <Flex borderBottom="1px solid" borderColor="#F0E6D4" bg="rgba(197,160,89,0.03)">
              <Box w="200px" p={4} borderRight="1px solid" borderColor="#F0E6D4">
                <Text fontSize="11px" fontWeight="700" color="#C5A059" textTransform="uppercase" letterSpacing="1px">Room / Date</Text>
              </Box>
              {dates.map((date, i) => (
                <Box key={i} flex={1} p={4} textAlign="center" borderRight={i < daysToShow - 1 ? "1px solid" : "none"} borderColor="#F0E6D4">
                  <Text fontSize="10px" color="#7A7A7A" fontWeight="600" textTransform="uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                  <Text fontSize="16px" fontWeight="700" color="#3D2010">{date.getDate()}</Text>
                </Box>
              ))}
            </Flex>

            {/* Room Rows */}
            {rooms.map((room) => (
              <Flex key={room._id} borderBottom="1px solid" borderColor="#F0E6D4" _hover={{ bg: "rgba(197,160,89,0.02)" }}>
                <Box w="200px" p={4} borderRight="1px solid" borderColor="#F0E6D4">
                  <Text fontSize="14px" fontWeight="600" color="#3D2010">Room {room.roomNumber}</Text>
                  <Badge fontSize="9px" bg="gray.50" color="gray.500" mt={1}>{room.category}</Badge>
                </Box>
                {dates.map((date, i) => {
                  const booked = isBooked(room._id, date);
                  return (
                    <Box 
                      key={i} 
                      flex={1} 
                      p={2} 
                      bg={booked ? "rgba(211, 47, 47, 0.05)" : "transparent"}
                      borderRight={i < daysToShow - 1 ? "1px solid" : "none"} 
                      borderColor="#F0E6D4"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box 
                        w="full" 
                        h="32px" 
                        borderRadius="6px" 
                        bg={booked ? "#D32F2F" : "#388E3C"} 
                        opacity={booked ? 0.8 : 0.15}
                        title={booked ? "Occupied" : "Available"}
                        transition="all 0.2s"
                        _hover={{ opacity: booked ? 1 : 0.3 }}
                      />
                    </Box>
                  );
                })}
              </Flex>
            ))}
          </Box>
        </Box>
      </Box>

      <HStack mt={10} gap={8} justify="center">
        <HStack gap={2}>
          <Box w="12px" h="12px" borderRadius="3px" bg="#388E3C" opacity={0.3} />
          <Text fontSize="12px" color="#7A7A7A">Available</Text>
        </HStack>
        <HStack gap={2}>
          <Box w="12px" h="12px" borderRadius="3px" bg="#D32F2F" opacity={0.8} />
          <Text fontSize="12px" color="#7A7A7A">Booked / Occupied</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Availability;
