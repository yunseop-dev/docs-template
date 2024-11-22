// components/TableOfContents.tsx
interface TocItem {
  title: string
  url: string
  depth: number
  children?: TocItem[]
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
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