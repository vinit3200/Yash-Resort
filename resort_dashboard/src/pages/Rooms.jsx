import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Icon, useDisclosure, Badge, useToast, Text } from '@chakra-ui/react';
import { Plus, BedDouble } from 'lucide-react';
import { fetchRooms, createRoom, updateRoom, deleteRoom } from '../store/slices/roomsSlice';
import { fetchResorts } from '../store/slices/resortsSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';

const categoryColors = { Classic: '#7A7A7A', Executive: '#3D2010', Villa: '#C5A059', Suite: '#8B6914' };

const Rooms = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.rooms);
  const resorts = useSelector(state => state.resorts.items);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editData, setEditData] = useState(null);
  const toast = useToast();

  useEffect(() => { dispatch(fetchRooms()); dispatch(fetchResorts()); }, [dispatch]);

  const roomFields = useMemo(() => [
    { name: 'resort', label: 'Resort', type: 'select', required: true, options: resorts.map(r => ({ value: r._id, label: r.name })) },
    { name: 'roomNumber', label: 'Room Number', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['Classic', 'Executive', 'Villa', 'Suite'] },
    { name: 'price', label: 'Price per Night (₹)', type: 'number', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', defaultValue: '2' },
    { name: 'amenities', label: 'Amenities (comma separated)' },
    { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Booked', 'Maintenance'], defaultValue: 'Available' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ], [resorts]);

  const handleSubmit = async (data) => {
    const formatted = { ...data, price: Number(data.price), capacity: Number(data.capacity) || 2, amenities: typeof data.amenities === 'string' ? data.amenities.split(',').map(a => a.trim()) : data.amenities };
    if (editData) {
      await dispatch(updateRoom({ id: editData._id, ...formatted })).unwrap();
    } else {
      await dispatch(createRoom(formatted)).unwrap();
    }
  };

  const handleEdit = (row) => {
    setEditData({ ...row, resort: row.resort?._id || row.resort, amenities: Array.isArray(row.amenities) ? row.amenities.join(', ') : row.amenities });
    onOpen();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteRoom(id)).unwrap();
    toast({ title: 'Room deleted', status: 'success', duration: 2000, position: 'top' });
  };



  const columns = useMemo(() => [
    { header: 'Room', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center"><Icon as={BedDouble} boxSize={4} color="#C5A059" /></Flex>
        <Box><Text fontSize="14px" fontWeight="600">Room {row.roomNumber}</Text><Text fontSize="12px" color="#7A7A7A">{row.resort?.name}</Text></Box>
      </Flex>
    )},
    { header: 'Category', render: (row) => <Badge bg={`${categoryColors[row.category]}15`} color={categoryColors[row.category]} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.category}</Badge> },
    { header: 'Price', render: (row) => <Text fontWeight="600">₹{row.price?.toLocaleString()}</Text> },
    { header: 'Capacity', accessor: 'capacity' },
    { header: 'Status', render: (row) => {
      const c = { Available: { bg: 'green.50', color: 'green.600' }, Booked: { bg: 'blue.50', color: 'blue.600' }, Maintenance: { bg: 'orange.50', color: 'orange.600' } };
      return <Badge bg={c[row.status]?.bg} color={c[row.status]?.color} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.status}</Badge>;
    }},
  ], []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontFamily="'Cormorant Garamond', serif" fontSize="20px" fontWeight="500" color="#7A7A7A">Manage rooms across resorts</Text>
        <Button bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" leftIcon={<Icon as={Plus} boxSize={4} />} onClick={() => { setEditData(null); onOpen(); }} fontSize="14px">Add Room</Button>
      </Flex>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} searchPlaceholder="Search rooms..." filters={[{ key: 'category', label: 'Category', options: ['Classic', 'Executive', 'Villa', 'Suite'] }, { key: 'status', label: 'Status', options: ['Available', 'Booked', 'Maintenance'] }]} />
      <FormModal isOpen={isOpen} onClose={onClose} title={editData ? 'Edit Room' : 'Add New Room'} fields={roomFields} onSubmit={handleSubmit} initialData={editData} />
    </Box>
  );
};

export default Rooms;
