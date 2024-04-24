import { Box, Container, VStack, Text, Input, Button, HStack, IconButton, useToast } from '@chakra-ui/react';
import { FaPaperPlane, FaPlus, FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const toast = useToast();

  const sendMessage = () => {
    if (message.trim() === '') {
      toast({
        title: 'Cannot send an empty message.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newMessage = {
      id: messages.length + 1,
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sent',
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4}>
        <HStack width="100%" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">Chat Application</Text>
          <IconButton icon={<FaUserPlus />} isRound="true" />
        </HStack>
        <VStack
          width="100%"
          height="500px"
          bg="gray.100"
          overflowY="scroll"
          p={3}
          spacing={4}
          align="stretch"
        >
          {messages.map((msg) => (
            <HStack key={msg.id} justifyContent="flex-end">
              <Text bg="blue.500" color="white" px={3} py={1} borderRadius="lg">
                {msg.text}
              </Text>
              <Text fontSize="xs">{msg.timestamp}</Text>
            </HStack>
          ))}
        </VStack>
        <HStack width="100%">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <IconButton
            icon={<FaPaperPlane />}
            onClick={sendMessage}
            colorScheme="blue"
            isRound="true"
          />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;