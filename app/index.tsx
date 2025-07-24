import { Center } from '@/components/ui/center';
import TypeLogo from '@/types/type.logo';
import React from 'react';

export default function SplashScreen() {
  return (
    <Center className="flex-1" >
      <TypeLogo color={'slategray'} height={240} />
    </Center>

  );
}

