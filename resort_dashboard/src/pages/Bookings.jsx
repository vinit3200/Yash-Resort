import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Badge, Text } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { fetchBookings, createBooking, updateBooking, deleteBooking } from '../store/slices/bookingsSlice';
import { fetchResorts } from '../store/slices/resortsSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { toaster } from '../utils/toaster';

const Bookings = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.bookings);
  const resorts = useSelector(state => state.resorts.items);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchResorts());
  }, [dispatch]);

  useEffect(() => {
    if (error) toaster.create({ title: error, type: 'error', duration: 4000 });
  }, [error]);

  // Walk-in/Manual Booking Fields (Simplified to match Backend Model)
  const newBookingFields = [
    { name: 'name', label: 'Guest Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'resortId', label: 'Resort', type: 'select', options: resorts.map(r => ({ value: r._id, label: r.name })), required: true },
    { name: 'roomType', label: 'Room Category', type: 'select', options: ['Classic', 'Executive', 'Cottage/Villa', 'Suite'], required: true },
    { name: 'checkIn', label: 'Check-In Date', type: 'date', required: true },
    { name: 'checkOut', label: 'Check-Out Date', type: 'date', required: true },
    { name: 'guests', label: 'Guests', type: 'number', defaultValue: '1' },
    { name: 'totalAmount', label: 'Total Amount (₹)', type: 'number' },
    { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Online', 'Cash'], defaultValue: 'Cash' },
    { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['paid', 'pending'], defaultValue: 'pending' },
    { name: 'bookingStatus', label: 'Booking Status', type: 'select', options: ['confirmed', 'check-in', 'check-out', 'cancelled'], defaultValue: 'confirmed' },
    { name: 'specialRequests', label: 'Special Requests', type: 'textarea' },
  ];

  const editBookingFields = [
    { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['paid', 'pending'] },
    { name: 'bookingStatus', label: 'Booking Status', type: 'select', options: ['confirmed', 'check-in', 'check-out', 'cancelled'] },
    { name: 'totalAmount', label: 'Total Amount (₹)', type: 'number' },
    { name: 'specialRequests', label: 'Special Requests', type: 'textarea' },
  ];

  const handleNewSubmit = async (data) => {
    await dispatch(createBooking({
      ...data,
      checkIn: new Date(data.checkIn).toISOString(),
      checkOut: new Date(data.checkOut).toISOString(),
      guests: Number(data.guests) || 1,
      totalAmount: Number(data.totalAmount) || 0,
    })).unwrap();
    toaster.create({ title: 'Guest added & Room assigned', type: 'success', duration: 2000 });
    setIsOpen(false);
  };

  const handleEditSubmit = async (data) => {
    await dispatch(updateBooking({
      id: editData._id,
      ...data,
    })).unwrap();
    toaster.create({ title: 'Booking updated', type: 'success', duration: 2000 });
    setIsOpen(false);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteBooking(id)).unwrap();
    toaster.create({ title: 'Booking deleted', type: 'success', duration: 2000 });
  };

  const columns = useMemo(() => [
    { header: 'Guest', render: (row) => (
      <Box>
        <Text fontSize="14px" fontWeight="600">{row.customerId?.name || row.name}</Text>
        <Text fontSize="12px" color="#7A7A7A">{row.customerId?.phone || row.phone}</Text>
      </Box>
    )},
    { header: 'Resort', render: (row) => <Text fontSize="14px">{row.resortId?.name || '—'}</Text> },
    { header: 'Room Type', render: (row) => <Badge bg="gray.50" color="gray.600" borderRadius="6px" px={2} fontSize="11px">{row.roomType || row.roomId?.category}</Badge> },
    { header: 'Room #', render: (row) => row.roomId ? <Text fontSize="14px" fontWeight="500">{row.roomId.roomNumber}</Text> : <Badge bg="orange.50" color="orange.600" borderRadius="6px" px={2} fontSize="10px" fontWeight="600">Unassigned</Badge> },
    { header: 'Dates', render: (row) => (
      <Box>
        <Text fontSize="14px">{row.checkIn ? new Date(row.checkIn).toLocaleDateString() : '—'}</Text>
        <Text fontSize="12px" color="#7A7A7A">to {row.checkOut ? new Date(row.checkOut).toLocaleDateString() : '—'}</Text>
      </Box>
    )},
    { header: 'Amount', render: (row) => <Text fontWeight="600">₹{row.totalAmount?.toLocaleString() || 0}</Text> },
    { header: 'Payment', render: (row) => {
      const c = { paid: { bg: 'green.50', color: 'green.600' }, pending: { bg: 'orange.50', color: 'orange.600' } };
      return <Badge bg={c[row.paymentStatus]?.bg} color={c[row.paymentStatus]?.color} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.paymentStatus}</Badge>;
    }},
    { header: 'Status', render: (row) => {
      const c = { 
        confirmed: { bg: 'blue.50', color: 'blue.600' }, 
        'check-in': { bg: 'green.50', color: 'green.600' }, 
        'check-out': { bg: 'purple.50', color: 'purple.600' }, 
        cancelled: { bg: 'red.50', color: 'red.600' } 
      };
      return <Badge bg={c[row.bookingStatus]?.bg} color={c[row.bookingStatus]?.color} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.bookingStatus}</Badge>;
    }},
  ], []);

  return (
    <Box pb={10}>
      <Flex justify="space-between" align="center" mb={10} flexWrap="wrap" gap={4}>
        <Box>
          <Text 
            fontFamily="'Cormorant Garamond', serif" 
            fontSize="32px" 
            fontWeight="600" 
            color="#3D2010"
            lineHeight="1.2"
          >
            Reservations
          </Text>
          <Text fontSize="14px" color="#7A7A7A" mt={1}>Manage room assignments, check-ins and payments</Text>
        </Box>
        <Button 
          px={6} 
          h="52px"
          bg="#3D2010" 
          color="white" 
          _hover={{ bg: '#2A1309', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(61,32,16,0.15)' }} 
          borderRadius="14px" 
          onClick={() => { setEditData(null); setIsOpen(true); }} 
          fontSize="14px"
          fontWeight="600"
          gap={2}
          transition="all 0.3s"
        >
          <Plus size={18} /> New Guest Booking
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search bookings..."
        filters={[
          { key: 'paymentStatus', label: 'Payment', options: ['paid', 'pending'] },
          { key: 'bookingStatus', label: 'Status', options: ['confirmed', 'check-in', 'check-out', 'cancelled'] },
        ]}
      />
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editData ? 'Update Status' : 'Quick Book Walk-in Guest'}
        fields={editData ? editBookingFields : newBookingFields}
        onSubmit={editData ? handleEditSubmit : handleNewSubmit}
        initialData={editData}
      />
    </Box>
  );
};

export default Bookings;
