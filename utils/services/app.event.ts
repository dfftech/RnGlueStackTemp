import {signal} from '@preact/signals-react';
import AppStorage, {
  DIR,
  GOOGLE_ACCESS_TOKEN,
  LANG,
  NAV,
  SESSION_INFO,
  THEME,
  TOKEN,
} from './app.storage';
import {AppRouter} from './app.router';
import {RouterType, ToastType} from './app.types';
import {langDirection} from '../../i18n';

export const ColorMode = signal<'light' | 'dark'>(
  AppStorage.getData(THEME) || 'light',
);

export const SessionLang = signal<string>(AppStorage.getData(LANG) || 'en-US');
export const CurrentTabName = signal<string>(AppRouter.home);

export const RtlDir = signal<boolean>(
  langDirection(AppStorage.getData(DIR) || 'en-US') === 'rtl',
);
const defaultNav = ({screen: AppRouter.signin} as RouterType);
 // AppStorage.getData(NAV) || ({screen: AppRouter.signin} as RouterType);
export const RouterEvent = signal(defaultNav);
export const RouterChange = (
  screen: AppRouter,
  query?: Record<string, string>,
) => {
  RouterEvent.value = {screen, query};
  AppStorage.setData(NAV, RouterEvent.value);
  if (screen === AppRouter.signin) {
    AppStorage.removeData(TOKEN);
    AppStorage.removeData(SESSION_INFO);
    AppStorage.removeData(GOOGLE_ACCESS_TOKEN);
  }
};

export const ToastMessage = signal<ToastType>({
  id: '0',
  show: false,
  title: '',
  message: '',
  type: 'success',
});

export const ShowToast = (
  title: string,
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
) => {
  ToastMessage.value = {
    id: Math.random().toString(),
    show: true,
    title,
    message,
    type,
  };
};
