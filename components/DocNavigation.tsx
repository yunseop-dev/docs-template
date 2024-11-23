'use client';
import { getNavigationData } from '@/utils/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

interface DocNavigation {
  title: string
  slug: string
}

interface DocNavigationProps {
  docs: {
    [key: string]: DocNavigation;
  }[]
}

export function DocNavigation({ docs }: DocNavigationProps) {
  const pathname = usePathname();
  const currentSlug = pathname.replace('/docs', '');
  const { prev, next } = useMemo(() => getNavigationData(docs, currentSlug), [docs, currentSlug])
  useKeyboardNav(
    prev?.slug ? `/docs${prev.slug}` : null,
    next?.slug ? `/docs${next.slug}` : null
  )

  return (
    <nav className="flex justify-between mt-8 pt-8 border-t">
      {prev ? (
        <Link
          href={`/docs${prev.slug}`}
          className="group flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <div>
            <div className="text-sm text-gray-500">이전</div>
            <div className="font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs${next.slug}`}
          className="group flex items-center gap-2 text-right text-gray-600 hover:text-gray-900"
        >
          <div>
            <div className="text-sm text-gray-500">다음</div>
            <div className="font-medium">{next.title}</div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}