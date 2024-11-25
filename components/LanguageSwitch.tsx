// components/LanguageSwitch.tsx
'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, defaultLocale } from '@/config/i18n'

export default function LanguageSwitch() {
  const pathname = usePathname()
  const segments = pathname.split('/')


  const isDefaultPath = !locales.includes(segments[1] as any)
  const currentLocale = isDefaultPath ? defaultLocale : segments[1]
  const restPath = isDefaultPath ? segments.slice(1).join('/') : segments.slice(2).join('/')

  return (
    <div className="flex gap-4">
      {locales.map(locale => {
        const href = locale === defaultLocale
          ? `/${restPath}`
          : `/${locale}/${restPath}`

        return (
          <Link
            key={locale}
            href={href}
            className={locale === currentLocale ? 'font-bold' : ''}
          >
            {localeNames[locale]}
          </Link>
        )
      })}
    </div>
  )
}