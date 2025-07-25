import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import AppStorage, {LANG, TRANS} from '@/utils/services/app.storage';
import RNRestart from 'react-native-restart';

// Import translation files
import enUS from './locales/en-US.json';
import teIN from './locales/te-IN.json';
import hiIN from './locales/hi-IN.json';
import taIN from './locales/ta-IN.json';
import knIN from './locales/kn-IN.json';
import mlIN from './locales/ml-IN.json';
import arSA from './locales/ar-SA.json';

import {SessionLang} from '@/utils/services/app.event';
import {languages} from '@/utils/services/app.data';

let SessionTrans: Record<string, string> = {};

export const langDirection = (lang: string) => {
  return languages.find(l => l.lang === lang)?.dir ?? 'ltr';
};

export const resources: any = {
  'en-US': {
    translation: enUS,
  },
  'te-IN': {
    translation: teIN,
  },
  'hi-IN': {
    translation: hiIN,
  },
  'ta-IN': {
    translation: taIN,
  },
  'kn-IN': {
    translation: knIN,
  },
  'ml-IN': {
    translation: mlIN,
  },
  'ar-SA': {
    translation: arSA,
  },
} as const;

// Initialize with stored language if available
const storedLang = AppStorage.getData(LANG) || 'en-US';

// Set initial RTL value
const isRTL = langDirection(storedLang) !== 'ltr';

if (I18nManager.isRTL !== isRTL) {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}

i18n.use(initReactI18next).init({
  resources,
  lng: storedLang,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

// Language change listener
i18n.on('languageChanged', (lng: string) => {
  try {
    const isRTL = langDirection(lng) !== 'ltr';
    const currentIsRTL = I18nManager.isRTL;

    // Only update RTL if it's different from current state
    if (currentIsRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    AppStorage.setData(LANG, lng);
    SessionLang.value = lng;
    if (lng in resources) {
      AppStorage.setData(
        TRANS,
        resources[lng as keyof typeof resources].translation,
      );
      SessionTrans = resources[lng as keyof typeof resources].translation;
    }

    // Only restart if RTL state changed
    if (currentIsRTL !== isRTL) {
      // Add small delay to ensure storage is updated
      setTimeout(() => {
        RNRestart.Restart();
      }, 100);
    }
  } catch (error) {
    console.error('Error during language change:', error);
  }
});

export default i18n;

export const trans = (
  nameLang?: Record<string, string>,
  defaultName?: string,
) => {
  let val = nameLang ? nameLang[SessionLang.value] : defaultName;

  return val === undefined || val === null || val.trim() === ''
    ? defaultName
    : val;
};
export const t = (key: string) => {
  return SessionTrans[key] || key;
};
