interface DocNavigation {
  title: string
  slug: string
}

interface NavigationData {
  prev: DocNavigation | null
  next: DocNavigation | null
}

export function getNavigationData(docs: {
  [key: string]: any;
}[], currentSlug: string): NavigationData {

  // 현재 문서의 인덱스 찾기
  const currentIndex = docs.findIndex((doc) => doc.slug === currentSlug)

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
