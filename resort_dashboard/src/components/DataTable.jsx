import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text,
  InputGroup, InputLeftElement, Input, Icon, IconButton,
  Select, Spinner, HStack,
} from '@chakra-ui/react';
import { Search, ChevronLeft, ChevronRight, Trash2, Edit3 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const DataTable = ({ columns, data = [], loading = false, onEdit, onDelete, searchPlaceholder = 'Search...', filters = [], pageSize = 8 }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({});

  const filteredData = useMemo(() => {
    let result = data;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(row => {
        // 1. Resorts: Name or Rooms Count
        if (row.name && row.totalRooms !== undefined && !row.organizer) {
          if (row.name.toLowerCase().includes(s)) return true;
          if (String(row.totalRooms).includes(s)) return true;
        }

        // 2. Rooms: Room Number or Category
        if (row.roomNumber && row.category) {
          if (row.roomNumber.toLowerCase().includes(s)) return true;
          if (row.category.toLowerCase().includes(s)) return true;
        }

        // 3. Bookings: Guest Name or Check-in Date
        if (row.customer && row.checkIn && row.room) {
          const guestName = row.customer.name.toLowerCase();
          const checkInDate = new Date(row.checkIn).toLocaleDateString().toLowerCase();
          if (guestName.includes(s)) return true;
          if (checkInDate.includes(s)) return true;
        }

        // 4. Customers: Name, email, or phone
        if (row.checkIn && row.checkOut && !row.room) {
          if (row.name?.toLowerCase().includes(s)) return true;
          if (row.email?.toLowerCase().includes(s)) return true;
          if (row.phone?.toLowerCase().includes(s)) return true;
        }

        // 5. Events: Event Name
        if (row.name && row.organizer) {
          if (row.name.toLowerCase().includes(s)) return true;
        }

        // Fallback: Search visible columns
        return columns.some(col => {
          const val = col.accessor ? (typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]) : '';
          return String(val).toLowerCase().includes(s);
        });
      });
    }
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) result = result.filter(row => String(row[key]) === value);
    });
    return result;
  }, [data, search, filterValues, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <Box bg="white" borderRadius="20px" border="1px solid" borderColor="#E8E0D6" overflow="hidden">
        <Flex p={5} gap={3} flexWrap="wrap" align="center" borderBottom="1px solid" borderColor="#F0E6D4">
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none"><Icon as={Search} color="#7A7A7A" boxSize={4} /></InputLeftElement>
            <Input placeholder={searchPlaceholder} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} bg="#FAF6F0" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }} />
          </InputGroup>
          {filters.map((f) => (
            <Select key={f.key} placeholder={f.label} maxW="180px" bg="#FAF6F0" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" value={filterValues[f.key] || ''} onChange={(e) => { setFilterValues(p => ({ ...p, [f.key]: e.target.value })); setCurrentPage(1); }} _focus={{ borderColor: '#C5A059' }}>
              {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </Select>
          ))}
          <Text fontSize="13px" color="#7A7A7A" ml="auto">{filteredData.length} results</Text>
        </Flex>

        {loading ? (
          <Flex justify="center" py={20}><Spinner size="lg" color="#C5A059" thickness="3px" /></Flex>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead><Tr>{columns.map(col => <Th key={col.header}>{col.header}</Th>)}{(onEdit || onDelete) && <Th textAlign="right">Actions</Th>}</Tr></Thead>
              <Tbody>
                {paginatedData.length === 0 ? (
                  <Tr><Td colSpan={columns.length + 1} textAlign="center" py={12}><Text color="#7A7A7A">No data found</Text></Td></Tr>
                ) : paginatedData.map((row, idx) => (
                  <Tr key={row._id || idx} _hover={{ bg: 'rgba(197,160,89,0.03)' }}>
                    {columns.map(col => <Td key={col.header}>{col.render ? col.render(row) : typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}</Td>)}
                    {(onEdit || onDelete) && (
                      <Td textAlign="right">
                        <HStack spacing={1} justify="flex-end">
                          {onEdit && <IconButton icon={<Icon as={Edit3} boxSize={4} />} size="sm" variant="ghost" borderRadius="10px" color="#7A7A7A" _hover={{ color: '#C5A059', bg: 'rgba(197,160,89,0.08)' }} onClick={() => onEdit(row)} aria-label="Edit" />}
                          {onDelete && <IconButton icon={<Icon as={Trash2} boxSize={4} />} size="sm" variant="ghost" borderRadius="10px" color="#7A7A7A" _hover={{ color: '#E53E3E', bg: 'rgba(229,62,62,0.08)' }} onClick={() => onDelete(row._id)} aria-label="Delete" />}
                        </HStack>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        {totalPages > 1 && (
          <Flex justify="space-between" align="center" p={5} borderTop="1px solid" borderColor="#F0E6D4">
            <Text fontSize="13px" color="#7A7A7A">Page {currentPage} of {totalPages}</Text>
            <HStack spacing={2}>
              <IconButton icon={<Icon as={ChevronLeft} boxSize={4} />} size="sm" variant="outline" borderRadius="10px" isDisabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} aria-label="Prev" />
              <IconButton icon={<Icon as={ChevronRight} boxSize={4} />} size="sm" variant="outline" borderRadius="10px" isDisabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} aria-label="Next" />
            </HStack>
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
};

export default DataTable;
