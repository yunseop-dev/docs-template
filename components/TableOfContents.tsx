'use client';
import { usePathname } from "next/navigation";

interface TocItem {
  title: string
  url: string
  depth: number
  children?: TocItem[]
}

interface TableOfContentsProps {
  records: Record<string, TocItem[]>
}

export default function TableOfContents({ records }: TableOfContentsProps) {
  const pathname = usePathname();
  const slug = pathname.replace('/docs', '');
  const items = records[slug] ?? [];
  if (items.length === 0) return null;
  return (
    <nav className="toc">
      <h2 className="text-lg font-semibold mb-4">목차</h2>
      <TocItems items={items} />
    </nav>
  )
}

function TocItems({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className={`pl-${(item.depth - 1) * 4}`}>
          <a
            href={item.url}
            className="text-gray-600 hover:text-gray-900 hover:underline"
          >
            {item.title}
          </a>
          {item.children && <TocItems items={item.children} />}
        </li>
      ))}
    </ul>
  )
}