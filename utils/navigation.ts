// utils/navigation.ts
import { Locale } from '@/config/i18n'
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
  const localeDocs = docs.filter((item) => {
    return item.slug.split('/')[1] === locale;
  })
  const currentIndex = localeDocs.findIndex((doc) => doc.slug === `/${locale}/${currentSlug}`)

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