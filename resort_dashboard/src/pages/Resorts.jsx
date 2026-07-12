import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Badge, Text } from '@chakra-ui/react';
import { Plus, Building2, MapPin, Star } from 'lucide-react';
import { fetchResorts, createResort, updateResort, deleteResort } from '../store/slices/resortsSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { useState } from 'react';
import { toaster } from '../utils/toaster';

const resortFields = [
  { name: 'name', label: 'Resort Name', required: true },
  { name: 'location', label: 'Location', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'totalRooms', label: 'Total Rooms', type: 'number', required: true },
  { name: 'amenities', label: 'Amenities (comma separated)' },
  { name: 'contactEmail', label: 'Contact Email', type: 'email' },
  { name: 'contactPhone', label: 'Contact Phone' },
  { name: 'rating', label: 'Rating', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Maintenance'], defaultValue: 'Active' },
];

const Resorts = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.resorts);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => { dispatch(fetchResorts()); }, [dispatch]);

  const handleSubmit = async (data) => {
    const formatted = { ...data, amenities: typeof data.amenities === 'string' ? data.amenities.split(',').map(a => a.trim()) : data.amenities, totalRooms: Number(data.totalRooms), rating: Number(data.rating) || 4.5 };
    if (editData) {
      await dispatch(updateResort({ id: editData._id, ...formatted })).unwrap();
    } else {
      await dispatch(createResort(formatted)).unwrap();
    }
  };

  const handleEdit = (row) => {
    setEditData({ ...row, amenities: Array.isArray(row.amenities) ? row.amenities.join(', ') : row.amenities });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteResort(id)).unwrap();
    toaster.create({ title: 'Resort deleted', type: 'success', duration: 2000 });
  };

  const handleAdd = () => { setEditData(null); setIsOpen(true); };

  const columns = useMemo(() => [
    { header: 'Resort', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center"><Building2 size={16} color="#C5A059" /></Flex>
        <Box><Text fontSize="14px" fontWeight="600" color="#3D2010">{row.name}</Text><Flex align="center" gap={1}><MapPin size={12} color="#7A7A7A" /><Text fontSize="12px" color="#7A7A7A">{row.location}</Text></Flex></Box>
      </Flex>
    )},
    { header: 'Rooms', accessor: 'totalRooms' },
    { header: 'Rating', render: (row) => <Flex align="center" gap={1}><Star size={14} color="#C5A059" fill="#C5A059" /><Text fontSize="14px">{row.rating}</Text></Flex> },
    { header: 'Status', render: (row) => {
      const colors = { Active: { bg: 'green.50', color: 'green.600' }, Inactive: { bg: 'gray.50', color: 'gray.600' }, Maintenance: { bg: 'orange.50', color: 'orange.600' } };
      const c = colors[row.status] || colors.Active;
      return <Badge bg={c.bg} color={c.color} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.status}</Badge>;
    }},
  ], []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={10}>
        <Text fontFamily="'Cormorant Garamond', serif" fontSize="20px" fontWeight="500" color="#7A7A7A">Manage your resort properties</Text>
        <Button px={4} bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" onClick={handleAdd} fontSize="14px"><Plus size={16} /> Add Resort</Button>
      </Flex>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} searchPlaceholder="Search resorts..." filters={[{ key: 'status', label: 'Status', options: ['Active', 'Inactive', 'Maintenance'] }]} />
      <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editData ? 'Edit Resort' : 'Add New Resort'} fields={resortFields} onSubmit={handleSubmit} initialData={editData} />
    </Box>
  );
};

export default Resorts;
