import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Button, Badge, Text } from '@chakra-ui/react';
import { Plus, PartyPopper, Calendar } from 'lucide-react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../store/slices/eventsSlice';
import { fetchResorts } from '../store/slices/resortsSlice';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { toaster } from '../utils/toaster';

const typeColors = { Wedding: '#E91E8C', Corporate: '#3D2010', Birthday: '#C5A059', Conference: '#2B6CB0', Function: '#38A169', Other: '#7A7A7A' };

const Events = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.events);
  const resorts = useSelector(state => state.resorts.items);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => { dispatch(fetchEvents()); dispatch(fetchResorts()); }, [dispatch]);

  const eventFields = useMemo(() => [
    { name: 'name', label: 'Event Name', required: true },
    { name: 'type', label: 'Event Type', type: 'select', required: true, options: ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Function', 'Other'] },
    { name: 'resort', label: 'Resort', type: 'select', required: true, options: resorts.map(r => ({ value: r._id, label: r.name })) },
    { name: 'date', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'guestCount', label: 'Guest Count', type: 'number', required: true },
    { name: 'organizer', label: 'Organizer', required: true },
    { name: 'contactPhone', label: 'Contact Phone' },
    { name: 'contactEmail', label: 'Contact Email', type: 'email' },
    { name: 'budget', label: 'Budget (₹)', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], defaultValue: 'Upcoming' },
    { name: 'notes', label: 'Notes', type: 'textarea' },
  ], [resorts]);

  const handleSubmit = async (data) => {
    const formatted = { ...data, guestCount: Number(data.guestCount), budget: Number(data.budget) || 0 };
    if (editData) {
      await dispatch(updateEvent({ id: editData._id, ...formatted })).unwrap();
    } else {
      await dispatch(createEvent(formatted)).unwrap();
    }
  };

  const handleEdit = (row) => {
    setEditData({ ...row, resort: row.resort?._id || row.resort, date: row.date?.split('T')[0], endDate: row.endDate?.split('T')[0] });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEvent(id)).unwrap();
    toaster.create({ title: 'Event deleted', type: 'success', duration: 2000 });
  };

  const columns = useMemo(() => [
    { header: 'Event', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center"><PartyPopper size={16} color="#C5A059" /></Flex>
        <Box><Text fontSize="14px" fontWeight="600">{row.name}</Text><Text fontSize="12px" color="#7A7A7A">{row.resort?.name}</Text></Box>
      </Flex>
    )},
    { header: 'Type', render: (row) => <Badge bg={`${typeColors[row.type]}15`} color={typeColors[row.type]} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.type}</Badge> },
    { header: 'Date', render: (row) => <Flex align="center" gap={1}><Calendar size={14} color="#7A7A7A" /><Text fontSize="14px">{new Date(row.date).toLocaleDateString()}</Text></Flex> },
    { header: 'Guests', render: (row) => <Text fontWeight="600">{row.guestCount}</Text> },
    { header: 'Organizer', accessor: 'organizer' },
    { header: 'Budget', render: (row) => <Text fontWeight="600">₹{row.budget?.toLocaleString()}</Text> },
    { header: 'Status', render: (row) => {
      const c = { Upcoming: { bg: 'blue.50', color: 'blue.600' }, Ongoing: { bg: 'green.50', color: 'green.600' }, Completed: { bg: 'gray.50', color: 'gray.600' }, Cancelled: { bg: 'red.50', color: 'red.600' } };
      return <Badge bg={c[row.status]?.bg} color={c[row.status]?.color} borderRadius="8px" px={3} py={1} fontSize="11px" fontWeight="600">{row.status}</Badge>;
    }},
  ], []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={10}>
        <Text fontFamily="'Cormorant Garamond', serif" fontSize="20px" fontWeight="500" color="#7A7A7A">Manage events & functions</Text>
        <Button px={4} bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" onClick={() => { setEditData(null); setIsOpen(true); }} fontSize="14px"><Plus size={16} /> New Event</Button>
      </Flex>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} searchPlaceholder="Search events..." filters={[{ key: 'type', label: 'Type', options: ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Function', 'Other'] }, { key: 'status', label: 'Status', options: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'] }]} />
      <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editData ? 'Edit Event' : 'New Event'} fields={eventFields} onSubmit={handleSubmit} initialData={editData} />
    </Box>
  );
};

export default Events;
