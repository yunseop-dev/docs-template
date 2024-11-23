// components/LanguageSwitch.tsx
'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames } from '@/config/i18n'

export default function LanguageSwitch() {
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1]
  const restPath = pathname.split('/').slice(2).join('/')

  return (
    <div className="flex gap-4">
      {locales.map(locale => (
        <Link
          key={locale}
          href={`/${locale}/${restPath}`}
          className={locale === currentLocale ? 'font-bold' : ''}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  )
}