// utils/navigation.ts
import { defaultLocale, Locale, locales } from '@/config/i18n'
import { getAllDocs } from './mdx'

interface DocNavigation {
  title: string
  slug: string
}

interface NavigationData {
  prev: DocNavigation | null
  next: DocNavigation | null
}

export async function getNavigationData(currentSlug: string, locale: Locale): Promise<NavigationData> {
  const docs = await getAllDocs()
  const localeDocs = locale === defaultLocale ? docs.filter((item) => {
    return !locales.includes(item.slug.split('/')[1] as Locale);
  }) : docs.filter((item) => {
    return item.slug.split('/')[1] === locale;
  })
  const currentIndex = localeDocs.findIndex((doc) => locale === defaultLocale ? doc.slug === `/docs/${currentSlug}` : doc.slug === `/${locale}/docs/${currentSlug}`)

  return {
    prev: currentIndex > 0 ? {
      title: localeDocs[currentIndex - 1].title,
      slug: localeDocs[currentIndex - 1].slug,
    } : null,
    next: currentIndex < localeDocs.length - 1 ? {
      title: localeDocs[currentIndex + 1].title,
      slug: localeDocs[currentIndex + 1].slug,
    } : null,
  }
}