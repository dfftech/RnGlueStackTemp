import React from 'react';
import { useTranslation } from 'react-i18next';
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
import { languages } from '../services/app.data';

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
        const selectedLang = languages.find((lang) => lang.lang === value);
        if (selectedLang) {
          handleLanguageChange(selectedLang.lang, selectedLang.dir);
        }
      }}
    >
      <SelectTrigger variant="underlined" size="lg" className="p-1">
        <SelectInput
          value={languages.find((lang) => lang.lang === i18n.language)?.locale || 'English'}
        />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem
              key={lang.lang}
              label={lang.locale}
              value={lang.lang}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
