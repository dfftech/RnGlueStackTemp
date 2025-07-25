import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { ColorMode } from '@/utils/services/app.event';
import { useSignals } from '@preact/signals-react/runtime';



export default function HomePage() {
  useSignals();
  const { t } = useTranslation();

  return (
    <Box className="flex-1 p-8 items-center justify-center">
      <VStack space="xl" style={{ alignItems: 'center' }}>
        <Heading size="3xl" style={{ textAlign: 'center' }}>
          {t('welcome')}  {t('home')}
        </Heading>
        <Text size="lg" style={{ textAlign: 'center' }}>
          {t('description')}
        </Text>

        <Box style={{ marginTop: 32 }}>
          <Heading size="2xl">
            {t('featuresTitle')}
          </Heading>
          <VStack space="md">
            <Text>• {t('featuresMultilingual')}</Text>
            <Text>• {t('featuresRtl')}</Text>
            <Text>• {t('featuresTheme')}</Text>
            <Text>• {t('featuresModern')}</Text>
            <Text>•  ColorMode: {ColorMode.value}</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

