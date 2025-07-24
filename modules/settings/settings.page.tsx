import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { useSignals } from '@preact/signals-react/runtime';

import { AppLang } from '@/utils/components/app.lang';
import { AppTheme } from '@/utils/components/app.theme';
import { HStack } from '@/components/ui/hstack';
import React from 'react';


export default function SettingsPage() {
  useSignals();
  const { t } = useTranslation();

  return (
    <Box className="flex-1 items-center justify-center p-4">
      <VStack space="xl" >
        <Heading size="3xl">
          {t('welcome')} {t('settings')}
        </Heading>
        <Text size="lg" >
          {t('description')}
        </Text>
        <HStack space="lg" className='flex items-center'>
          <Text size="lg">{t('language')}: </Text> <AppLang />
        </HStack>
        <HStack space="lg" className='flex items-center'>
          <Text size="lg">{t('theme')}: </Text> <AppTheme />
        </HStack>
      </VStack >
    </Box >
  );
}

