import React from 'react';
import MenuPage from '@/modules/menu/menu.page';
import { ScrollView } from 'react-native';


const MenuScreen: React.FC = () => {
  return (
    <ScrollView> <MenuPage /></ScrollView>
  );
};

export default MenuScreen;