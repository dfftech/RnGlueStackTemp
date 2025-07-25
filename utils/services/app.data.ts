import {TranslationType} from './app.types';

export const languages = [
  {
    lang: 'en-US',
    name: 'English',
    locale: 'English',
    dir: 'ltr',
  },
  {
    lang: 'te-IN',
    name: 'Telugu',
    locale: 'తెలుగు',
    dir: 'ltr',
  },
  {
    lang: 'hi-IN',
    name: 'Hindi',
    locale: 'हिन्दी',
    dir: 'ltr',
  },
  {
    lang: 'kn-IN',
    name: 'Kannada',
    locale: 'ಕನ್ನಡ',
    dir: 'ltr',
  },
  {
    lang: 'ml-IN',
    name: 'Malayalam',
    locale: 'മലയാളം',
    dir: 'ltr',
  },
  {
    lang: 'ta-IN',
    name: 'Tamil',
    locale: 'தமிழ்',
    dir: 'ltr',
  },
  {
    lang: 'ar-SA',
    name: 'Arabic',
    locale: 'العربية',
    dir: 'rtl',
  },
] as const;

export const translationData: TranslationType = {
  'en-US': '',
  'te-IN': '',
  'hi-IN': '',
  'ta-IN': '',
  'ml-IN': '',
  'kn-IN': '',
  'ar-SA': '',
};
