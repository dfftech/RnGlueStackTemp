import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

const MenuPage: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Card className="p-6">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Menu Page
          </Text>
          <Text className="text-base text-muted-foreground">
            This is the menu page component. Implement your menu features here:
          </Text>
          <View className="mt-4">
            <Text className="text-sm text-muted-foreground">• Navigation menu</Text>
            <Text className="text-sm text-muted-foreground">• Menu categories</Text>
            <Text className="text-sm text-muted-foreground">• Menu items</Text>
            <Text className="text-sm text-muted-foreground">• Search functionality</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default MenuPage;