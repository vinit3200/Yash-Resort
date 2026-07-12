import {
  Dialog, Button, VStack, Field, CloseButton,
  Input, NativeSelect, Textarea, Box,
} from '@chakra-ui/react';
import { useState, useMemo, useCallback } from 'react';
import { toaster } from '../utils/toaster';

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

  const handleSubmit = async () => {
    const required = fields.filter(f => f.required);
    const missing = required.find(f => !formData[f.name]);
    if (missing) {
      toaster.create({ title: `${missing.label} is required`, type: 'warning', duration: 3000 });
      return;
    }
    try {
      await onSubmit(formData);
      onClose();
      toaster.create({ title: initialData ? 'Updated successfully' : 'Created successfully', type: 'success', duration: 3000 });
    } catch (err) {
      toaster.create({ title: err?.message || 'Something went wrong', type: 'error', duration: 3000 });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => { if (!details.open) onClose(); }} size="lg" placement="center">
      <Dialog.Backdrop bg="rgba(61,32,16,0.4)" backdropFilter="blur(8px)" />
      <Dialog.Positioner>
        <Dialog.Content borderRadius="24px" mx={4} boxShadow="0 25px 50px -12px rgba(61,32,16,0.25)" maxH="90vh" display="flex" flexDirection="column">
          <Dialog.Header fontFamily="'Cormorant Garamond', serif" fontSize="28px" fontWeight="600" color="#3D2010" pt={8} px={8} pb={4}>{title}</Dialog.Header>
          <Dialog.CloseTrigger asChild position="absolute" top="4" right="4">
            <CloseButton size="sm" borderRadius="10px" />
          </Dialog.CloseTrigger>
          <Dialog.Body px={8} py={8} overflowY="auto" flex="1">
            <VStack gap={6}>
              {fields.map(field => (
                <Field.Root key={field.name} required={field.required} width="100%">
                  <Field.Label fontSize="13px" fontWeight="600" color="#7A7A7A" textTransform="uppercase" letterSpacing="0.05em">{field.label}</Field.Label>
                  {field.type === 'select' ? (
                    <NativeSelect.Root width="100%">
                      <NativeSelect.Field
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        bg="white"
                        border="1px solid"
                        borderColor="#E8E0D6"
                        borderRadius="12px"
                        fontSize="14px"
                        h="52px"
                        px={4}
                        _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }}
                        readOnly={field.isReadOnly}
                        opacity={field.isReadOnly ? 0.7 : 1}
                        cursor={field.isReadOnly ? 'not-allowed' : 'default'}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                          <option key={typeof opt === 'object' ? opt.value : opt} value={typeof opt === 'object' ? opt.value : opt}>
                            {typeof opt === 'object' ? opt.label : opt}
                          </option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
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
                      width="100%"
                    >
                      {formData[field.name] || '—'}
                    </Box>
                  ) : field.type === 'textarea' ? (
                    <Textarea value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} bg="white" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" p={4} rows={4} _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }} width="100%" />
                  ) : (
                    <Input type={field.type || 'text'} value={formData[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} bg="white" border="1px solid" borderColor="#E8E0D6" borderRadius="12px" fontSize="14px" h="52px" px={4} _focus={{ borderColor: '#C5A059', boxShadow: '0 0 0 1px #C5A059' }} width="100%" />
                  )}
                </Field.Root>
              ))}
            </VStack>
          </Dialog.Body>
          <Dialog.Footer p={8} gap={4} borderTop="1px solid" borderColor="#F0E6D4" bg="rgba(197,160,89,0.02)" borderBottomRadius="24px">
            <Button variant="ghost" onClick={onClose} borderRadius="12px" fontSize="14px" h="48px" px={6}>Cancel</Button>
            <Button bg="#3D2010" color="white" _hover={{ bg: '#2A1309' }} borderRadius="12px" fontSize="14px" h="48px" px={8} onClick={handleSubmit} loading={loading}>
              {initialData ? 'Update' : 'Create'}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default FormModal;
