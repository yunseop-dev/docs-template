// utils/navigation.ts
import { getAllDocs } from './mdx'

interface DocNavigation {
  title: string
  slug: string
}

interface NavigationData {
  prev: DocNavigation | null
  next: DocNavigation | null
}

export async function getNavigationData(currentSlug: string): Promise<NavigationData> {
  const docs = await getAllDocs()
  const currentIndex = docs.findIndex((doc) => doc.slug === `/${currentSlug}`)
  console.log('docs', docs, currentIndex, currentSlug)

  return {
    prev: currentIndex > 0 ? {
      title: docs[currentIndex - 1].title,
      slug: docs[currentIndex - 1].slug,
    } : null,
    next: currentIndex < docs.length - 1 ? {
      title: docs[currentIndex + 1].title,
      slug: docs[currentIndex + 1].slug,
    } : null,
  }
}