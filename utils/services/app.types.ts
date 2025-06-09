export type RouterType = {
  screen: string;
  query?: Record<string, string>;
};

export type AuthStateType = {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
};

export type CountryType = {
  _id: string;
  name: string;
  nameLocal: string;
  googleNames: string[];
  currencyCode: string;
  currencyHex: string;
  telCode: string;
  flag: string;
  flagUrl: string;
  active: boolean;
};

export type FileType = {
  filename: string;
  mimetype: string;
  url: string;
  _id: string;
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

export type ModalType = {
  show: boolean;
  title: string;
  body: string;
  primaryAction: {
    label: string;
    action: () => void;
  };
  secondaryAction: {
    label: string;
    action: () => void;
  };
};

export interface SearchType {
  query: string | number;
}

export interface SiteInfoType {
  _id: string;
  summary: string;
  title: string;
  active?: boolean;
  img?: string;
  video?: string;
  order?: number;
  page: string;
  subTitle?: string;
}
