import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/ui/safe-area-view';


const ChatScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">

      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-xl font-semibold text-foreground">
          Chat Screen
        </Text>
        <Text className="text-sm text-muted-foreground mt-2 text-center">
          This is the chat screen. Add your chat functionality here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;