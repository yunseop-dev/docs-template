// utils/mdx.ts
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, Locale } from '@/config/i18n'

const DOCS_DIRECTORY = path.join(process.cwd(), 'content')

export async function getMdxFiles() {
    const files = await getFiles()
    return files
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
            const relativePath = path.relative(DOCS_DIRECTORY, file)
            const [locale, ...slug] = relativePath.replace(/\.mdx$/, '').split(path.sep)
            return { locale, slug }
        })
}

export async function getFiles(dir = DOCS_DIRECTORY): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    const files = await Promise.all(
        entries.map(async (entry) => {
            const res = path.resolve(dir, entry.name)
            if (entry.isDirectory()) {
                return getFiles(res)
            }
            return res
        })
    )

    return files
        .flat()
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
}

/**
 * MDX 파일의 frontmatter와 content를 파싱합니다.
 */
export async function getMatter(filePath: string): Promise<{ data: { [key: string]: any }; content: string }> {
    const source = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(source)

    // 파일 경로에서 slug 생성
    const slug = filePath
        .replace(DOCS_DIRECTORY, '')
        .replace(/\/page/, '')
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/') // Windows 경로 구분자 처리

    return {
        data: {
            ...data,
            slug,
        },
        content,
    }
}

/**
 * 특정 MDX 파일의 메타데이터를 가져옵니다.
 */
export async function getDocBySlug(slug: string[], locale: Locale) {
    const slugPath = Array.isArray(slug) ? slug.join('/') : slug
    const filePath = path.join(DOCS_DIRECTORY, locale, `${slugPath}.mdx`)

    const source = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(source)

    return {
        content,
        frontmatter: data,
        slug: slugPath
    }
}

/**
 * 모든 문서의 메타데이터를 가져옵니다.
 */
export async function getAllDocs() {
    const files = await getFiles()

    const docs = await Promise.all(
        files.map(async (file) => {
            const { data } = await getMatter(file)
            return data
        })
    )
    return docs.map((item) => {
        const [, locale, ...slug] = item.slug.split('/');
        if (locale === defaultLocale) {
            return ({ ...item, slug: `/docs/${slug.join('/')}` })
        }
        return ({ ...item, slug: `/${locale}/docs/${slug.join('/')}` });
    }).sort((a, b) => {
        if (a.order && b.order) {
            return a.order - b.order
        }
        return 0
    })
}