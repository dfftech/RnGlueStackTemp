import {AllLanguageCodesType} from 'dff-util';

export type SupportedLanguagesType = Extract<
  AllLanguageCodesType,
  'en-US' | 'te-IN' | 'kn-IN' | 'ta-IN' | 'hi-IN' | 'ml-IN' | 'ar-SA'
>;

export type TranslationType = Record<SupportedLanguagesType, string>;

export type RouterType = {
  screen: string;
  query?: Record<string, string>;
};

export interface SearchType {
  query: string | number;
}

export type RolesType = 'USER' | 'PRACTITIONER' | 'STAFF';

export type CurrencyCodeType = 'INR' | 'USD' | 'JPY';

export type ToastType = {
  id: string;
  show: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
};

export type ScreenAccessType = {
  name: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};
