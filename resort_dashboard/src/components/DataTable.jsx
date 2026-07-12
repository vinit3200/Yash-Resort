import {
  Box, Table, Flex, Text, Input, IconButton,
  NativeSelect, Spinner, HStack,
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
        if (row.checkIn && (row.customerId || row.name)) {
          const guestName = (row.customerId?.name || row.name || "").toLowerCase();
          const checkInDate = row.checkIn ? new Date(row.checkIn).toLocaleDateString().toLowerCase() : "";
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
      <Box 
        bg="white" 
        borderRadius="24px" 
        border="1px solid" 
        borderColor="rgba(197,160,89,0.15)" 
        overflow="hidden" 
        boxShadow="0 10px 40px rgba(61,32,16,0.04)"
      >
        <Flex 
          p={8} 
          gap={6} 
          flexWrap="wrap" 
          align="center" 
          bg="rgba(250,246,240,0.5)"
          borderBottom="1px solid" 
          borderColor="rgba(197,160,89,0.1)"
        >
          <Box position="relative" maxW="360px" w="full">
            <Box position="absolute" left="16px" top="50%" transform="translateY(-50%)" pointerEvents="none" zIndex={1}>
              <Search size={18} color="#C5A059" />
            </Box>
            <Input 
              placeholder={searchPlaceholder} 
              value={search} 
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
              bg="white" 
              border="1px solid" 
              borderColor="rgba(197,160,89,0.2)" 
              borderRadius="14px" 
              fontSize="14px" 
              h="52px" 
              pl="48px" 
              _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }} 
              _placeholder={{ color: '#A0A0A0' }}
            />
          </Box>
          <HStack gap={4} flex="1" justify="flex-start">
            {filters.map((f) => (
              <NativeSelect.Root key={f.key} maxW="200px">
                <NativeSelect.Field 
                  bg="white" 
                  border="1px solid" 
                  borderColor="rgba(197,160,89,0.2)" 
                  borderRadius="14px" 
                  fontSize="14px" 
                  h="52px" 
                  px={4} 
                  value={filterValues[f.key] || ''} 
                  onChange={(e) => { setFilterValues(p => ({ ...p, [f.key]: e.target.value })); setCurrentPage(1); }} 
                  _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }}
                >
                  <option value="">{f.label}</option>
                  {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </NativeSelect.Field>
              </NativeSelect.Root>
            ))}
          </HStack>
          <Text fontSize="13px" fontWeight="600" color="#C5A059" letterSpacing="0.02em">{filteredData.length} entries found</Text>
        </Flex>

        {loading ? (
          <Flex justify="center" py={24}><Spinner size="xl" color="#C5A059" thickness="4px" /></Flex>
        ) : (
          <Box overflowX="auto" w="full" maxW="100%" display="block" className="premium-scrollbar">
            <Table.Root variant="line" minW="1100px">
              <Table.Header bg="rgba(250,246,240,0.3)">
                <Table.Row>
                  {columns.map(col => (
                    <Table.ColumnHeader 
                      key={col.header} 
                      px={8} 
                      py={6} 
                      fontSize="12px" 
                      fontWeight="700"
                      textTransform="uppercase" 
                      letterSpacing="0.1em" 
                      color="#7A7A7A"
                    >
                      {col.header}
                    </Table.ColumnHeader>
                  ))}
                  {(onEdit || onDelete) && (
                    <Table.ColumnHeader 
                      px={8} 
                      py={6} 
                      textAlign="right" 
                      fontSize="12px" 
                      fontWeight="700"
                      textTransform="uppercase" 
                      letterSpacing="0.1em" 
                      color="#7A7A7A"
                    >
                      Actions
                    </Table.ColumnHeader>
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {paginatedData.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={columns.length + 1} textAlign="center" py={20}>
                      <Text color="#A0A0A0" fontStyle="italic">No matching records found</Text>
                    </Table.Cell>
                  </Table.Row>
                ) : paginatedData.map((row, idx) => (
                  <Table.Row 
                    key={row._id || idx} 
                    _hover={{ bg: 'rgba(197,160,89,0.02)' }} 
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    borderBottom="1px solid"
                    borderColor="rgba(197,160,89,0.05)"
                  >
                    {columns.map(col => (
                      <Table.Cell key={col.header} px={8} py={6} fontSize="14px">
                        {col.render ? col.render(row) : typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                      </Table.Cell>
                    ))}
                    {(onEdit || onDelete) && (
                      <Table.Cell px={8} py={6} textAlign="right">
                        <HStack gap={3} justify="flex-end">
                          {onEdit && (
                            <IconButton 
                              size="sm" 
                              variant="ghost" 
                              borderRadius="12px" 
                              color="#7A7A7A" 
                              _hover={{ color: '#C5A059', bg: 'rgba(197,160,89,0.08)', transform: 'translateY(-1px)' }} 
                              onClick={() => onEdit(row)} 
                              aria-label="Edit"
                            >
                              <Edit3 size={17} />
                            </IconButton>
                          )}
                          {onDelete && (
                            <IconButton 
                              size="sm" 
                              variant="ghost" 
                              borderRadius="12px" 
                              color="#7A7A7A" 
                              _hover={{ color: '#E53E3E', bg: 'rgba(229,62,62,0.08)', transform: 'translateY(-1px)' }} 
                              onClick={() => onDelete(row._id)} 
                              aria-label="Delete"
                            >
                              <Trash2 size={17} />
                            </IconButton>
                          )}
                        </HStack>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {totalPages > 1 && (
          <Flex justify="space-between" align="center" px={8} py={6} bg="rgba(250,246,240,0.2)" borderTop="1px solid" borderColor="rgba(197,160,89,0.1)">
            <Text fontSize="13px" fontWeight="500" color="#7A7A7A">Showing Page {currentPage} of {totalPages}</Text>
            <HStack gap={3}>
              <IconButton 
                size="md" 
                variant="outline" 
                borderRadius="14px" 
                borderColor="rgba(197,160,89,0.3)"
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => p - 1)} 
                _hover={{ bg: 'rgba(197,160,89,0.05)', borderColor: '#C5A059' }}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </IconButton>
              <IconButton 
                size="md" 
                variant="outline" 
                borderRadius="14px" 
                borderColor="rgba(197,160,89,0.3)"
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(p => p + 1)} 
                _hover={{ bg: 'rgba(197,160,89,0.05)', borderColor: '#C5A059' }}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </IconButton>
            </HStack>
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
};

export default DataTable;
