import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed' // Optional prefixing
});

export const localeNames: Record<string, string> = {
  zh: '中文',
  en: 'English'
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
