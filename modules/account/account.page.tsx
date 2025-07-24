import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';

const AccountPage: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Card className="p-6">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Account Page
          </Text>
          <Text className="text-base text-muted-foreground">
            This is the account page component. Implement your account features here:
          </Text>
          <View className="mt-4">
            <Text className="text-sm text-muted-foreground">• Profile information</Text>
            <Text className="text-sm text-muted-foreground">• Account settings</Text>
            <Text className="text-sm text-muted-foreground">• Privacy settings</Text>
            <Text className="text-sm text-muted-foreground">• Security options</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default AccountPage;