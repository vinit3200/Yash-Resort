import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Icon, useDisclosure, Badge, useToast, Text } from '@chakra-ui/react';
import { Plus, Users } from 'lucide-react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../store/slices/customersSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

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
  { name: 'specialRequests', label: 'Special Requests', type: 'textarea' },
];

const Customers = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.customers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editData, setEditData] = useState(null);
  const toast = useToast();

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

  const handleEdit = (row) => {
    setEditData({
      ...row,
      checkIn: row.checkIn ? row.checkIn.split('T')[0] : '',
      checkOut: row.checkOut ? row.checkOut.split('T')[0] : '',
    });
    onOpen();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCustomer(id)).unwrap();
    toast({ title: 'Customer deleted', status: 'success', duration: 2000, position: 'top' });
  };

  const columns = useMemo(() => [
    { header: 'Guest', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center">
          <Icon as={Users} boxSize={4} color="#7A7A7A" />
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
    { header: 'Room', render: (row) => <Badge bg="rgba(197,160,89,0.1)" color="#C5A059" borderRadius="6px" px={2} fontSize="10px" fontWeight="600">{row.roomType}</Badge> },
    { header: 'Guests', render: (row) => <Text fontSize="14px" color="#7A7A7A">{row.adults} A, {row.children} C</Text> },
  ], []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontFamily="'Cormorant Garamond', serif" fontSize="20px" fontWeight="500" color="#7A7A7A">Guest directory & profiles</Text>
        <Button bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" leftIcon={<Icon as={Plus} boxSize={4} />} onClick={() => { setEditData(null); onOpen(); }} fontSize="14px">Add Guest</Button>
      </Flex>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} searchPlaceholder="Search guests..." />
      <FormModal isOpen={isOpen} onClose={onClose} title={editData ? 'Edit Guest' : 'Add New Guest'} fields={customerFields} onSubmit={handleSubmit} initialData={editData} />
    </Box>
  );
};

export default Customers;
