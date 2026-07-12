import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid, Box, Text, Flex, Badge, Icon, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CalendarCheck, DollarSign, Hotel, Users, Building2, PartyPopper, TrendingUp, BedDouble } from 'lucide-react';
import { fetchDashboard } from '../store/slices/dashboardSlice';
import StatsCard from '../components/StatsCard';

const MotionBox = motion.create(Box);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <Box bg="white" p={4} borderRadius="14px" border="1px solid #E8E0D6" boxShadow="0 10px 40px rgba(61,32,16,0.08)">
        <Text fontSize="13px" color="#7A7A7A" mb={1}>{label}</Text>
        <Text fontSize="18px" fontWeight="600" color="#3D2010" fontFamily="'Cormorant Garamond', serif">
          ₹{payload[0].value?.toLocaleString()}
        </Text>
      </Box>
    );
  }
  return null;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, monthlyRevenue, recentBookings, upcomingEvents, loading } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
    const interval = setInterval(() => dispatch(fetchDashboard()), 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading && !stats) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" color="#C5A059" thickness="4px" speed="0.8s" emptyColor="#E8E0D6" />
      </Flex>
    );
  }

  const statsCards = [
    { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: CalendarCheck},
    { title: 'Revenue', value: stats?.totalRevenue || 0, icon: DollarSign, prefix: '₹'},
    { title: 'Occupancy Rate', value: stats?.occupancyRate || 0, icon: Hotel, suffix: '%'},
    { title: 'Active Guests', value: stats?.activeGuests || 0, icon: Users},
  ];

  return (
    <Box>
      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={8}>
        {statsCards.map((card, i) => (
          <StatsCard key={card.title} {...card} delay={i * 0.1} />
        ))}
      </SimpleGrid>

      {/* Charts Row */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5} mb={8}>
        {/* Revenue Chart */}
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Box bg="white" borderRadius="20px" p={6} border="1px solid" borderColor="#E8E0D6">
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text fontFamily="'Cormorant Garamond', serif" fontSize="22px" fontWeight="600" color="#3D2010">Revenue Overview</Text>
                <Text fontSize="13px" color="#7A7A7A">Last 6 months performance</Text>
              </Box>
              <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center">
                <Icon as={TrendingUp} boxSize={5} color="#C5A059" />
              </Flex>
            </Flex>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D4" />
                <XAxis dataKey="month" stroke="#7A7A7A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#7A7A7A" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#C5A059" strokeWidth={2.5} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </MotionBox>

        {/* Bookings Chart */}
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Box bg="white" borderRadius="20px" p={6} border="1px solid" borderColor="#E8E0D6">
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text fontFamily="'Cormorant Garamond', serif" fontSize="22px" fontWeight="600" color="#3D2010">Bookings Trend</Text>
                <Text fontSize="13px" color="#7A7A7A">Monthly booking count</Text>
              </Box>
              <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center">
                <Icon as={CalendarCheck} boxSize={5} color="#C5A059" />
              </Flex>
            </Flex>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E6D4" />
                <XAxis dataKey="month" stroke="#7A7A7A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#7A7A7A" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3D2010" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </MotionBox>
      </SimpleGrid>

      {/* Recent Bookings + Upcoming Events */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Box bg="white" borderRadius="20px" p={6} border="1px solid" borderColor="#E8E0D6">
            <Text fontFamily="'Cormorant Garamond', serif" fontSize="22px" fontWeight="600" color="#3D2010" mb={5}>Recent Bookings</Text>
            {recentBookings.length === 0 ? (
              <Text color="#7A7A7A" fontSize="14px" py={8} textAlign="center">No recent bookings</Text>
            ) : (
              recentBookings.map((b, i) => (
                <Flex key={b._id || i} justify="space-between" align="center" py={3} borderBottom={i < recentBookings.length - 1 ? '1px solid' : 'none'} borderColor="#F0E6D4">
                  <Box>
                    <Text fontSize="14px" fontWeight="600" color="#3D2010">{b.customerId?.name}</Text>
                    <Text fontSize="12px" color="#7A7A7A">{b.resortId?.name || '—'}{b.roomId ? ` · Room ${b.roomId?.roomNumber}` : ' · Room TBD'}</Text>
                  </Box>
                  <Badge bg={b.paymentStatus === 'paid' ? 'green.50' : 'orange.50'} color={b.paymentStatus === 'paid' ? 'green.600' : 'orange.600'} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">
                    {b.paymentStatus}
                  </Badge>
                </Flex>
              ))
            )}
          </Box>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Box bg="white" borderRadius="20px" p={6} border="1px solid" borderColor="#E8E0D6">
            <Text fontFamily="'Cormorant Garamond', serif" fontSize="22px" fontWeight="600" color="#3D2010" mb={5}>Upcoming Events</Text>
            {upcomingEvents.length === 0 ? (
              <Text color="#7A7A7A" fontSize="14px" py={8} textAlign="center">No upcoming events</Text>
            ) : (
              upcomingEvents.map((e, i) => (
                <Flex key={e._id || i} justify="space-between" align="center" py={3} borderBottom={i < upcomingEvents.length - 1 ? '1px solid' : 'none'} borderColor="#F0E6D4">
                  <Box>
                    <Text fontSize="14px" fontWeight="600" color="#3D2010">{e.name}</Text>
                    <Text fontSize="12px" color="#7A7A7A">{e.resort?.name} · {new Date(e.date).toLocaleDateString()}</Text>
                  </Box>
                  <Badge bg="rgba(197,160,89,0.1)" color="#C5A059" borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">
                    {e.type}
                  </Badge>
                </Flex>
              ))
            )}
          </Box>
        </MotionBox>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
