import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Badge, Text, Dialog, CloseButton } from '@chakra-ui/react';
import { Plus, Users, Mail } from 'lucide-react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../store/slices/customersSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { toaster } from '../utils/toaster';

const customerFields = [
  { name: 'name', label: 'Guest Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'checkIn', label: 'Check-In Date', type: 'date', required: true },
  { name: 'checkOut', label: 'Check-Out Date', type: 'date', required: true },
  { name: 'adults', label: 'Adults', type: 'number', defaultValue: '1' },
  { name: 'children', label: 'Children', type: 'number', defaultValue: '0' },
  { name: 'roomType', label: 'Room Type', type: 'select', options: ['Classic','Executive','Cottage/Villa','Suite'], defaultValue: 'Standard' },
  { name: 'roomCount', label: 'Room Count', type: 'number', defaultValue: '1' },
  { name: 'bookingStatus', label: 'Booking Status', type: 'select', options: ['confirmed', 'check-in', 'check-out', 'cancelled'] },
  { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['paid', 'pending'] },
  { name: 'specialRequests', label: 'Special Requests', type: 'textarea' },
];

const Customers = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.customers);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [requestPopup, setRequestPopup] = useState({ open: false, content: '', guestName: '' });

  useEffect(() => { dispatch(fetchCustomers()); }, [dispatch]);

  const handleSubmit = async (data) => {
    const formatted = {
      ...data,
      checkIn: new Date(data.checkIn).toISOString(),
      checkOut: new Date(data.checkOut).toISOString(),
      adults: Number(data.adults),
      children: Number(data.children),
      roomCount: Number(data.roomCount),
    };
    if (editData) {
      await dispatch(updateCustomer({ id: editData._id, ...formatted })).unwrap();
    } else {
      await dispatch(createCustomer(formatted)).unwrap();
    }
  };

  const handleEdit = useCallback((row) => {
    setEditData({
      ...row,
      checkIn: row.checkIn ? row.checkIn.split('T')[0] : '',
      checkOut: row.checkOut ? row.checkOut.split('T')[0] : '',
    });
    setIsOpen(true);
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteCustomer(id)).unwrap();
    toaster.create({ title: 'Customer deleted', type: 'success', duration: 2000 });
  };

  const columns = useMemo(() => [
    { header: 'Guest', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center">
          <Users size={16} color="#7A7A7A" />
        </Flex>
        <Box>
          <Text fontSize="14px" fontWeight="600">{row.name}</Text>
          <Text fontSize="12px" color="#7A7A7A">{row.email}</Text>
        </Box>
      </Flex>
    )},
    { header: 'Phone', accessor: 'phone' },
    { header: 'Check-In', render: (row) => <Text fontSize="14px" color="#7A7A7A">{new Date(row.checkIn).toLocaleDateString()}</Text> },
    { header: 'Check-Out', render: (row) => <Text fontSize="14px" color="#7A7A7A">{new Date(row.checkOut).toLocaleDateString()}</Text> },
    { header: 'Room', render: (row) => <Badge bg="rgba(197,160,89,0.1)" color="#C5A059" borderRadius="6px" px={2} fontSize="10px" fontWeight="600">{row.roomCount > 1 ? `${row.roomCount} x ` : ''}{row.roomType}</Badge> },
    { header: 'Guests', render: (row) => <Text fontSize="14px" color="#7A7A7A">{row.adults}A{row.children > 0 ? `, ${row.children}C` : ''}</Text> },
    { header: 'Total Payable', render: (row) => <Text fontSize="14px" fontWeight="600" color="#3D2010">₹{row.totalAmount || 0}</Text> },
    { header: 'Booking Status', render: (row) => (
      <Badge 
        px={2} py={1} borderRadius="6px" fontSize="10px" fontWeight="700"
        bg={row.bookingStatus === 'confirmed' ? 'blue.50' : row.bookingStatus === 'check-in' ? 'green.50' : row.bookingStatus === 'check-out' ? 'gray.50' : 'red.50'}
        color={row.bookingStatus === 'confirmed' ? 'blue.600' : row.bookingStatus === 'check-in' ? 'green.600' : row.bookingStatus === 'check-out' ? 'gray.600' : 'red.600'}
        cursor="pointer"
        onClick={() => handleEdit(row)}
      >
        {row.bookingStatus?.toUpperCase()}
      </Badge>
    )},
    { header: 'Payment', render: (row) => (
      <Badge 
        px={2} py={1} borderRadius="6px" fontSize="10px" fontWeight="700"
        bg={row.paymentStatus === 'paid' ? 'green.50' : 'orange.50'}
        color={row.paymentStatus === 'paid' ? 'green.600' : 'orange.600'}
        cursor="pointer"
        onClick={() => handleEdit(row)}
      >
        {row.paymentStatus?.toUpperCase()}
      </Badge>
    )},
    { header: 'Special', render: (row) => row.specialRequests ? (
      <Box 
        cursor="pointer" 
        color="#C5A059" 
        _hover={{ color: '#3D2010', transform: 'scale(1.1)' }} 
        transition="all 0.2s"
        onClick={() => setRequestPopup({ open: true, content: row.specialRequests, guestName: row.name })}
      >
        <Mail size={18} />
      </Box>
    ) : <Text color="#E0E0E0">—</Text> },
  ], [handleEdit]);

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
            Guest Directory
          </Text>
          <Text fontSize="14px" color="#7A7A7A" mt={1}>Manage profiles, booking history and stay statuses</Text>
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
          <Plus size={18} /> Add New Guest
        </Button>
      </Flex>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} searchPlaceholder="Search by name, email or phone..." />
      <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editData ? 'Edit Guest' : 'Add New Guest'} fields={customerFields} onSubmit={handleSubmit} initialData={editData} />

      {/* Special Request Popup */}
      <Dialog.Root open={requestPopup.open} onOpenChange={(e) => setRequestPopup(p => ({ ...p, open: e.open }))} size="md" placement="center">
        <Dialog.Backdrop bg="rgba(61,32,16,0.4)" backdropFilter="blur(8px)" />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="24px" p={8} bg="white" boxShadow="0 25px 50px -12px rgba(61,32,16,0.25)">
            <Dialog.Header fontFamily="'Cormorant Garamond', serif" fontSize="24px" fontWeight="600" color="#3D2010" mb={4} p={0}>
              Special Request from {requestPopup.guestName}
            </Dialog.Header>
            <Dialog.CloseTrigger asChild position="absolute" top="4" right="4">
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body p={0}>
              <Box bg="#FAF6F0" p={6} borderRadius="16px" border="1px solid" borderColor="#E8E0D6">
                <Text fontSize="15px" color="#3D2010" fontStyle="italic" lineHeight="1.6">
                  "{requestPopup.content}"
                </Text>
              </Box>
            </Dialog.Body>
            <Dialog.Footer mt={6} p={0}>
              <Button w="full" bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" h="48px" onClick={() => setRequestPopup(p => ({ ...p, open: false }))}>
                Close
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  );
};

export default Customers;
