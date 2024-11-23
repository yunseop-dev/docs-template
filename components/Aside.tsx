'use client';
import { Locale } from '@/config/i18n';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface SidebarItem {
  title: string;
  href: string;
  locale: Locale;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export default function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const params = useParams()

  return (
    <aside className="sticky top-14 h-[calc(100vh-4rem)] border-r overflow-y-auto py-8 pr-6">
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} >
            <h4 className="text-sm font-semibold mb-1 px-2 py-1">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section
                .items
                .filter((item) => item.locale === params.locale)
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-2 py-1 rounded ${pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}