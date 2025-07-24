import React from 'react';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

const ChatPage: React.FC = () => {
  return (
    <Box className="flex-1">
      <Box className="p-4">

        <Text className="text-2xl font-bold mb-4">
          Chat Page
        </Text>
        <Text className="text-base">
          This is the chat page component. Implement your chat features here:
        </Text>
        <Box className="mt-4">
          <Text className="text-sm">• Message list</Text>
          <Text className="text-sm">• Message input</Text>
          <Text className="text-sm">• Real-time messaging</Text>
          <Text className="text-sm">• User avatars</Text>
        </Box>

      </Box>
    </Box>
  );
};

export default ChatPage;