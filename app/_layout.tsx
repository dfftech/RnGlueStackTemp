/* eslint-disable react-hooks/rules-of-hooks */
import { RouterChange, RouterEvent } from '@/utils/services/app.event';
import { useSignals } from '@preact/signals-react/runtime';
import AppHttp from '@/utils/services/app.http';
import React, { useEffect, useState } from 'react';
import { AppRouter } from '../utils/services/app.router';
import { effect } from '@preact/signals-react';
import { Stack, useNavigation } from 'react-native-auto-route';
import type { NavigationProp } from 'react-native-auto-route';

import { AppToast } from '../utils/components/app.toast';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import SplashScreen from '@/app/index';
import AppNavBar from '../utils/components/app.navbar';
import { SafeAreaView } from 'react-native';
import { Box } from '@/components/ui/box';

const AppLayout = () => {
  useSignals();

  const router = useNavigation() as NavigationProp<any>;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(3);

  useEffect(() => {
    switch (page) {
      case 1: RouterChange(AppRouter.home); break;
      case 2: RouterChange(AppRouter.chat); break;
      case 3: RouterChange(AppRouter.menu); break;
      case 4: RouterChange(AppRouter.account); break;
      case 5: RouterChange(AppRouter.settings); break;
      default: break;
    }
  }, [page]);

  useEffect(() => {
    AppHttp.getInstance();
    const unsubscribe = effect(() => {
      const screen = RouterEvent.value.screen;
      const params = RouterEvent.value.query;
      setLoading(false);
      console.log('Current Screen ::', screen, ' : Query ::', params);
      if (!screen || screen === '') {
        RouterChange(AppRouter.signin, undefined);
        return;
      }
      //setTimeout(() => {
      router.navigate(screen, params);
      //}, 1);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [router]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView className="flex-1 justify-end">
        <AppToast />
        {/* <AppHeader /> */}
        <Box className="flex-1">
          <Stack
            initialRouteName="splash"
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          />
        </Box>



        <AppNavBar
          icons={[
            'Home',
            'MessageSquare',
            'Menu',
            'User',
            'Settings',
          ]}
          navColor={'#4687FD'}
          selected={page}
          cb={(id: number) => setPage(id)}
        />
      </SafeAreaView>
    </I18nextProvider>
  );
};

export default AppLayout;
