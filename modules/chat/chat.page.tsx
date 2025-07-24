import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

const ChatPage: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Card className="p-6">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Chat Page
          </Text>
          <Text className="text-base text-muted-foreground">
            This is the chat page component. Implement your chat features here:
          </Text>
          <View className="mt-4">
            <Text className="text-sm text-muted-foreground">• Message list</Text>
            <Text className="text-sm text-muted-foreground">• Message input</Text>
            <Text className="text-sm text-muted-foreground">• Real-time messaging</Text>
            <Text className="text-sm text-muted-foreground">• User avatars</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ChatPage;