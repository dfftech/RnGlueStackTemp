import React from 'react';
import { ScrollView } from 'react-native';
import AccountPage from '@/modules/account/account.page';


const AccountScreen: React.FC = () => {
  return (
    <ScrollView>
      <AccountPage />
    </ScrollView>
  );
};

export default AccountScreen;