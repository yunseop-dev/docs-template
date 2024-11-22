// utils/generateSidebar.ts
import { getAllDocs } from './mdx'

export async function generateSidebar() {
    const docs = await getAllDocs()

    // 카테고리별로 문서 그룹화
    const groupedDocs = docs.reduce((acc, doc) => {
        const category = doc.category || 'uncategorized'
        if (!acc[category]) {
            acc[category] = []
        }
        acc[category].push(doc)
        return acc
    }, {} as Record<string, any>)

    // 사이드바 구조로 변환
    const sidebar = Object.entries(groupedDocs).map(([category, items]) => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        items: items.map((item: any) => ({
            title: item.title,
            href: `/docs${item.slug}`,
        })),
    }))

    return sidebar
}