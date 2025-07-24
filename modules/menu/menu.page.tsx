import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

const MenuPage: React.FC = () => {
  return (
    <ScrollView className="flex-1">
      <Box className="p-4">

        <Text className="text-2xl font-bold  mb-4">
          Menu Page
        </Text>
        <Text className="text-base">
          This is the menu page component. Implement your menu features here:
        </Text>
        <Box className="mt-4">
          <Text className="text-sm  ">• Navigation menu</Text>
          <Text className="text-sm  ">• Menu categories</Text>
          <Text className="text-sm  ">• Menu items</Text>
          <Text className="text-sm  ">• Search functionality</Text>
        </Box>

      </Box>
    </ScrollView>
  );
};

export default MenuPage;