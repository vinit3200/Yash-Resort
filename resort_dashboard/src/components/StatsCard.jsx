import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const StatsCard = ({ title, value, icon, prefix = '', suffix = '', delay = 0 }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <Box
        bg="white"
        borderRadius="20px"
        p={6}
        border="1px solid"
        borderColor="#E8E0D6"
        transition="all 0.4s ease"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 60px rgba(61, 32, 16, 0.06)',
          borderColor: '#C5A059',
        }}
        position="relative"
        overflow="hidden"
      >
        {/* Subtle gradient accent */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="3px"
          bgGradient="linear(to-r, #C5A059, #E0CDA8)"
          opacity={0}
          transition="opacity 0.4s ease"
          _groupHover={{ opacity: 1 }}
        />

        <Flex justify="space-between" align="flex-start" mb={4}>
          <Box>
            <Text
              fontSize="12px"
              fontWeight="600"
              color="#7A7A7A"
              textTransform="uppercase"
              letterSpacing="0.08em"
              mb={2}
            >
              {title}
            </Text>
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="36px"
              fontWeight="600"
              color="#3D2010"
              lineHeight="1"
              letterSpacing="-0.02em"
            >
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </Text>
          </Box>
          <Flex
            w="48px"
            h="48px"
            bg="rgba(197, 160, 89, 0.08)"
            borderRadius="14px"
            align="center"
            justify="center"
            transition="all 0.3s ease"
            _groupHover={{ bg: 'rgba(197, 160, 89, 0.15)' }}
          >
            <Icon as={icon} boxSize={5} color="#C5A059" />
          </Flex>
        </Flex>

        {/* {change !== undefined && (
          <Flex align="center" gap={1}>
            <Text
              fontSize="13px"
              fontWeight="600"
              color={changeType === 'up' ? '#38A169' : '#E53E3E'}
            >
              {changeType === 'up' ? '↑' : '↓'} {change}%
            </Text>
            <Text fontSize="12px" color="#7A7A7A">vs last month</Text>
          </Flex>
        )} */}
      </Box>
    </MotionBox>
  );
};

export default StatsCard;
