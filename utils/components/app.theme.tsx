'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AppStorage, { THEME } from '../services/app.storage';
import { useSignals } from '@preact/signals-react/runtime';
import { ColorMode } from '../services/app.event';
import { TypeIcon } from '@/types/type.icon';


export function AppTheme() {
  useSignals();
  useEffect(() => {
    const theme = AppStorage.getData(THEME) ?? 'dark';
    ColorMode.value = theme;
  }, []);

  const toggleTheme = () => {
    ColorMode.value = ColorMode.value === 'dark' ? 'light' : 'dark';
    AppStorage.setData(THEME, ColorMode.value);
  };

  return (
    <Button
      variant="solid"
      size="md"
      onPress={toggleTheme}
      className="rounded-full"

    >
      {ColorMode.value === 'dark' ? (
        <TypeIcon name="Sun" size={18} color="black" />
      ) : (
        <TypeIcon name="Moon" size={18} color="white" />
      )}
    </Button>
  );
}
