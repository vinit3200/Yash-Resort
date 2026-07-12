import { useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text, IconButton, Dialog, CloseButton, Button } from '@chakra-ui/react';
import { MessageSquare, Mail, Trash2 } from 'lucide-react';
import { fetchFeedbacks, deleteFeedback } from '../store/slices/feedbacksSlice';
import DataTable from '../components/DataTable';
import { toaster } from '../utils/toaster';

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.feedbacks);
  const [requestPopup, setRequestPopup] = useState({ open: false, content: '', guestName: '', subject: '' });

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteFeedback(id)).unwrap();
    toaster.create({ title: 'Feedback deleted', type: 'success', duration: 2000 });
  };

  const columns = useMemo(() => [
    { header: 'Guest', render: (row) => (
      <Flex align="center" gap={3}>
        <Flex w="40px" h="40px" bg="rgba(197,160,89,0.08)" borderRadius="12px" align="center" justify="center">
          <MessageSquare size={16} color="#C5A059" />
        </Flex>
        <Box>
          <Text fontSize="14px" fontWeight="600">{row.name}</Text>
          <Text fontSize="12px" color="#7A7A7A">{row.email} | {row.phone}</Text>
        </Box>
      </Flex>
    )},
    { header: 'Subject', accessor: 'subject' },
    { header: 'Date', render: (row) => <Text fontSize="14px" color="#7A7A7A">{new Date(row.createdAt).toLocaleDateString()}</Text> },
    { header: 'Message Preview', render: (row) => (
      <Text fontSize="14px" color="#7A7A7A" noOfLines={1} maxW="300px">
        {row.message}
      </Text>
    )},
    { header: 'View', render: (row) => (
      <Box 
        cursor="pointer" 
        color="#C5A059" 
        _hover={{ color: '#3D2010', transform: 'scale(1.1)' }} 
        transition="all 0.2s"
        onClick={() => setRequestPopup({ open: true, content: row.message, guestName: row.name, subject: row.subject })}
      >
        <Mail size={18} />
      </Box>
    )},
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
            General Enquiry & Feedback
          </Text>
          <Text fontSize="14px" color="#7A7A7A" mt={1}>Review guest experiences, reviews and general inquiries from the website</Text>
        </Box>
      </Flex>

      <DataTable 
        columns={columns} 
        data={items} 
        loading={loading} 
        onDelete={handleDelete}
        searchPlaceholder="Search by name, email or subject..." 
      />

      {/* Feedback Popup */}
      <Dialog.Root open={requestPopup.open} onOpenChange={(e) => setRequestPopup(p => ({ ...p, open: e.open }))} size="md" placement="center">
        <Dialog.Backdrop bg="rgba(61,32,16,0.4)" backdropFilter="blur(8px)" />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="24px" p={8} bg="white" boxShadow="0 25px 50px -12px rgba(61,32,16,0.25)">
            <Dialog.Header fontFamily="'Cormorant Garamond', serif" fontSize="24px" fontWeight="600" color="#3D2010" mb={2} p={0}>
              {requestPopup.subject}
            </Dialog.Header>
            <Text fontSize="13px" color="#C5A059" fontWeight="600" mb={4}>From: {requestPopup.guestName}</Text>
            <Dialog.CloseTrigger asChild position="absolute" top="4" right="4">
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body p={0}>
              <Box bg="#FAF6F0" p={6} borderRadius="16px" border="1px solid" borderColor="#E8E0D6">
                <Text fontSize="15px" color="#3D2010" lineHeight="1.6" whiteSpace="pre-wrap">
                  {requestPopup.content}
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

export default Feedbacks;
