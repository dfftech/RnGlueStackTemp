import {
  RouterChange,
  RouterEvent,
} from '@/utils/services/app.event';
import { useSignals } from '@preact/signals-react/runtime';
import AppHttp from '@/utils/services/app.http';
import React, { useEffect, useState } from 'react';
import {
  AppRouter,
} from '../utils/services/app.router';
import { effect } from '@preact/signals-react';
import { Stack, useNavigation } from 'react-native-auto-route';
import type { NavigationProp } from 'react-native-auto-route';

import { AppToast } from '@/utils/components/app.toast';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { AppHeader } from '@/utils/components/app.header';
import Splash from '@/app/index';

const AppLayout = () => {
  useSignals();

  const router = useNavigation() as NavigationProp<any>;
  const [loading, setLoading] = useState(true);


  // Effect to watch RouterEvent and trigger navigation
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
      setTimeout(() => {
        router.navigate(screen, params);
      }, 100);

    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [router]);

  if (loading) {
    return (
      <Splash />
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AppToast />
      <AppHeader />
      <Stack
        initialRouteName="splash"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      />
    </I18nextProvider>
  );
};

export default AppLayout;
