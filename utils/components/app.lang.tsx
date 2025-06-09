
'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n';
import AppStorage, { DIR } from '../services/app.storage';
import { RtlDir } from '../services/app.event';

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';

export function AppLang() {
  const { i18n } = useTranslation();

  const handleLanguageChange = async (langCode: string, dir: string) => {
    AppStorage.setData(DIR, dir);
    RtlDir.value = dir === 'rtl';
    await i18n.changeLanguage(langCode);
  };

  return (
    <Select
      onValueChange={(value) => {
        const selectedLang = languages.find((lang) => lang.code === value);
        if (selectedLang) {
          handleLanguageChange(selectedLang.code, selectedLang.dir);
        }
      }}
    >
      <SelectTrigger variant="underlined" size="lg" className="p-1">
        <SelectInput
          value={languages.find((lang) => lang.code === i18n.language)?.locale || 'English'}
        />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              label={lang.locale}
              value={lang.code}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
