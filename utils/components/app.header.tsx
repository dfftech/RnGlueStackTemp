'use client';
import React from 'react';
import { AppTheme } from './app.theme';
import { AppLang } from './app.lang';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { ColorMode } from '../services/app.event';
import { useSignals } from '@preact/signals-react/runtime';
import TypeLogo from '@/types/type.logo';



export function AppHeader() {
  useSignals();
  return (
    <Box className="flex flex-row justify-between items-center p-2 bg-white dark:bg-slate-800">
      <TypeLogo color={ColorMode.value === 'dark' ? 'slategray' : 'slategray'} height={48} />
      <HStack space="md" className=" items-end">
        <AppLang />
        <AppTheme />
      </HStack>
    </Box >

  );
}
