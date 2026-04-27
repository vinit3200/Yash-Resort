import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalFooter, ModalCloseButton, Button, VStack, FormControl,
  FormLabel, Input, Select, Textarea, useToast,
} from '@chakra-ui/react';
import { useState, useMemo, useCallback } from 'react';

const FormModal = ({ isOpen, onClose, title, fields, onSubmit, initialData = null, loading = false }) => {
  // Derive initial form state from props — no useEffect needed
  const defaultFormData = useMemo(() => {
    if (initialData) return { ...initialData };
    const defaults = {};
    fields.forEach(f => { defaults[f.name] = f.defaultValue || ''; });
    return defaults;
  }, [initialData, fields]);

  const [formData, setFormData] = useState(defaultFormData);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  // Sync state with props during render (React 19 recommended pattern)
  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setFormData(defaultFormData);
  }

  const handleChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const toast = useToast();

  const handleSubmit = async () => {
    const required = fields.filter(f => f.required);
    const missing = required.find(f => !formData[f.name]);
    if (missing) {
      toast({ title: `${missing.label} is required`, status: 'warning', duration: 3000, position: 'top' });
      return;
    }
    try {
      await onSubmit(formData);
      onClose();
      toast({ title: initialData ? 'Updated successfully' : 'Created successfully', status: 'success', duration: 3000, position: 'top' });
    } catch (err) {
      toast({ title: err?.message || 'Something went wrong', status: 'error', duration: 3000, position: 'top' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay bg="rgba(61,32,16,0.4)" backdropFilter="blur(8px)" />
      <ModalContent borderRadius="20px" mx={4}>
        <ModalHeader fontFamily="'Cormorant Garamond', serif" fontSize="24px" fontWeight="600" color="#3D2010" pb={0}>{title}</ModalHeader>
        <ModalCloseButton borderRadius="10px" />
        <ModalBody py={6}>
          <VStack spacing={4}>
            {fields.map(field => (
              <FormControl key={field.name} isRequired={field.required}>
                <FormLabel fontSize="13px" fontWeight="600" color="#7A7A7A" textTransform="uppercase" letterSpacing="0.05em">{field.label}</FormLabel>
                {field.type === 'select' ? (
                  <Select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    bg="white"
                    border="1px solid"
                    borderColor="#E8E0D6"
                    borderRadius="12px"
                    fontSize="14px"
                    _focus={{ borderColor: '#C5A059' }}
                    isReadOnly={field.isReadOnly}
                    opacity={field.isReadOnly ? 0.7 : 1}
                    cursor={field.isReadOnly ? 'not-allowed' : 'default'}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(opt => (
                      <option key={typeof opt === 'object' ? opt.value : opt} value={typeof opt === 'object' ? opt.value : opt}>
                        {typeof opt === 'object' ? opt.label : opt}
                      </option>
                    ))}
                  </Select>
                ) : field.isReadOnly ? (
                  <Box
                    px={4}
                    py={2}
                    bg="#FAF6F0"
                    border="1px solid"
                    borderColor="#E8E0D6"
                    borderRadius="12px"
                    fontSize="14px"
                    color="#7A7A7A"
                    minH="45px"
                    display="flex"
                    alignItems="center"
                  >
                    {formData[field.name] || '—'}
                  </Box>
                ) : field.type === 'textarea' ? (
                  <Textarea value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} bg="white" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" rows={3} _focus={{ borderColor: '#C5A059' }} />
                ) : (
                  <Input type={field.type || 'text'} value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} bg="white" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }} />
                )}
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter gap={3} borderTop="1px solid" borderColor="#F0E6D4">
          <Button variant="ghost" onClick={onClose} borderRadius="12px" fontSize="14px">Cancel</Button>
          <Button bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" fontSize="14px" onClick={handleSubmit} isLoading={loading}>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
