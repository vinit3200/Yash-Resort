import {
  Box, Flex, Text, Icon, IconButton, useDisclosure, Drawer, DrawerOverlay,
  DrawerContent, DrawerBody, VStack, DrawerCloseButton,
  Image
} from '@chakra-ui/react';
import { Menu as MenuIcon } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, BedDouble, CalendarCheck,
  Users, PartyPopper,
} from 'lucide-react';
import YashResortWhite from "../assets/yesh resort White.png";

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Resorts', icon: Building2, path: '/resorts' },
  { label: 'Rooms', icon: BedDouble, path: '/rooms' },
  { label: 'Bookings', icon: CalendarCheck, path: '/bookings' },
  { label: 'Customers', icon: Users, path: '/customers' },
  { label: 'Events', icon: PartyPopper, path: '/events' },
];

const pageTitles = {
  '/': 'Dashboard',
  '/resorts': 'Resorts',
  '/rooms': 'Rooms',
  '/bookings': 'Bookings',
  '/customers': 'Customers',
  '/events': 'Events',
};

const Navbar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <>
      <Box
        position="sticky"
        top={0}
        zIndex={50}
        bg="rgba(250, 246, 240, 0.85)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor="#E8E0D6"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="1280px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={4}
        >
          {/* Left: Mobile menu + Page title */}
          <Flex align="center" gap={3}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<Icon as={MenuIcon} />}
              variant="ghost"
              onClick={onOpen}
              aria-label="Menu"
              size="sm"
            />
            <Box>
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize={{ base: '24px', md: '28px' }}
                fontWeight="600"
                color="#3D2010"
                letterSpacing="-0.02em"
              >
                {pageTitle}
              </Text>
              <Text fontSize="13px" color="#7A7A7A" mt={-1}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </Box>
          </Flex>

          {/* Right: Static Brand/Info */}
          <Flex align="center" gap={3}>
             <Text fontSize="14px" fontWeight="600" color="#3D2010" display={{ base: 'none', sm: 'block' }}>
               Admin Panel
             </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay bg="rgba(61, 32, 16, 0.4)" backdropFilter="blur(8px)" />
        <DrawerContent bg="#3D2010" maxW="280px">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={8}>
            <Flex align="center" gap={3} mb={8}>
              <Flex w="40px" h="40px" bg="rgba(197, 160, 89, 0.15)" borderRadius="12px" align="center" justify="center">
                <Image src={YashResortWhite} alt="Yash Resort" />
              </Flex>
              <Text fontFamily="'Cormorant Garamond', serif" fontSize="20px" fontWeight="600" color="white">
                Yash Resorts
              </Text>
            </Flex>
            <VStack spacing={1} align="stretch">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink key={item.path} to={item.path} onClick={onClose} style={{ textDecoration: 'none' }}>
                    <Flex
                      align="center"
                      gap={3}
                      px={4}
                      py={3}
                      borderRadius="12px"
                      bg={isActive ? 'rgba(197, 160, 89, 0.15)' : 'transparent'}
                      color={isActive ? '#C5A059' : 'rgba(255,255,255,0.6)'}
                      fontWeight={isActive ? '600' : '400'}
                      fontSize="14px"
                    >
                      <Icon as={item.icon} boxSize={5} />
                      <Text>{item.label}</Text>
                    </Flex>
                  </NavLink>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
