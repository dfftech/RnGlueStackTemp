/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import { useToast, Toast, ToastTitle } from '@/components/ui/toast';
import { effect } from '@preact/signals-react';
import { ToastMessage } from '../services/app.event';
import { AppUUID4 } from 'dff-util';
import { Box } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { useSignals } from '@preact/signals-react/runtime';
import { InfoIcon } from '@/components/ui/icon';

export const AppToast = () => {
  useSignals();
  const toast = useToast();
  useEffect(() => {
    effect(() => {
      if (ToastMessage.value.show && ToastMessage.value.message) {
        showNewToast();
      }
    });
  }, []);


  const showNewToast = () => {

    toast.show({
      id: AppUUID4(),
      placement: 'bottom',
      duration: 5000,
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>{ToastMessage.value.message}</ToastTitle>
          </Toast>

        );
      },
    });
  };

  return null;
};
