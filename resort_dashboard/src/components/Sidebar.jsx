import { Box, VStack, Text, Flex, Icon, Divider, Image } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, BedDouble, CalendarCheck,
  Users, PartyPopper
} from 'lucide-react';
import YashResortWhite from "../assets/yesh resort White.png";

const MotionBox = motion.create(Box);

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Resorts', icon: Building2, path: '/resorts' },
  { label: 'Rooms', icon: BedDouble, path: '/rooms' },
  { label: 'Bookings', icon: CalendarCheck, path: '/bookings' },
  { label: 'Customers', icon: Users, path: '/customers' },
  { label: 'Events', icon: PartyPopper, path: '/events' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      w={{ base: '0', md: '280px' }}
      bg="#3D2010"
      color="white"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      zIndex={100}
      overflow="hidden"
    >
      {/* Logo */}
      <Flex
        align="center"
        gap={3}
        px={8}
        py={8}
        borderBottom="1px solid rgba(255,255,255,0.08)"
      >
        <Flex
          w="44px"
          h="44px"
          bg="rgba(197, 160, 89, 0.15)"
          borderRadius="14px"
          align="center"
          justify="center"
        >
          <Image src={YashResortWhite} alt="Yash Resort" />
        </Flex>
        <Box>
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize="22px"
            fontWeight="600"
            lineHeight="1.1"
            letterSpacing="-0.01em"
          >
            Yash Resorts
          </Text>
          <Text fontSize="11px" color="rgba(255,255,255,0.45)" fontWeight="500" letterSpacing="0.08em" textTransform="uppercase">
            Management
          </Text>
        </Box>
      </Flex>

      {/* Navigation */}
      <VStack spacing={1} px={4} py={6} flex={1} align="stretch">
        <Text
          fontSize="10px"
          fontWeight="600"
          color="rgba(255,255,255,0.35)"
          letterSpacing="0.12em"
          textTransform="uppercase"
          px={4}
          mb={2}
        >
          Main Menu
        </Text>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <MotionBox
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="12px"
                  cursor="pointer"
                  bg={isActive ? 'rgba(197, 160, 89, 0.15)' : 'transparent'}
                  color={isActive ? '#C5A059' : 'rgba(255,255,255,0.6)'}
                  fontWeight={isActive ? '600' : '400'}
                  fontSize="14px"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: isActive ? 'rgba(197, 160, 89, 0.15)' : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#C5A059' : 'rgba(255,255,255,0.9)',
                  }}
                  position="relative"
                >
                  {isActive && (
                    <Box
                      position="absolute"
                      left="-16px"
                      top="50%"
                      transform="translateY(-50%)"
                      w="3px"
                      h="24px"
                      bg="#C5A059"
                      borderRadius="0 4px 4px 0"
                    />
                  )}
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </Flex>
              </MotionBox>
            </NavLink>
          );
        })}
      </VStack>

      {/* Bottom Section */}
      <Box px={4} pb={6}>
        <Divider borderColor="rgba(255,255,255,0.08)" mb={4} />
        <Text textAlign="center" fontSize="10px" color="rgba(255,255,255,0.3)">
          © 2026 Yash Resorts
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
