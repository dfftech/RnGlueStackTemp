import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';

const AccountPage: React.FC = () => {
  return (
    <ScrollView className="flex-1">
      <Box className="p-4">

        <Text className="text-2xl font-bold  mb-4">
          Account Page
        </Text>
        <Text className="text-base ">
          This is the account page component. Implement your account features here:
        </Text>
        <Box className="mt-4">
          <Text className="text-sm">• Profile information</Text>
          <Text className="text-sm">• Account settings</Text>
          <Text className="text-sm">• Privacy settings</Text>
          <Text className="text-sm">• Security options</Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default AccountPage;