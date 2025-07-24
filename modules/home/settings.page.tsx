import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTranslation } from 'react-i18next';
import '@/i18n';

import { useSignals } from '@preact/signals-react/runtime';

import { AppLang } from '@/utils/components/app.lang';
import { AppTheme } from '@/utils/components/app.theme';


export default function SettingsPage() {
  useSignals();
  const { t } = useTranslation();

  return (
    <Box className="flex-1 px-4 py-4 items-center justify-center">
      <VStack space="xl" style={{ alignItems: 'center' }}>
        <Heading size="4xl" style={{ textAlign: 'center' }}>
          {t('welcome')} {t('settings')}
        </Heading>
        <Text size="lg" style={{ textAlign: 'center' }}>
          {t('description')}
        </Text>
        <AppLang />
        <AppTheme />
      </VStack>
    </Box>
  );
}

