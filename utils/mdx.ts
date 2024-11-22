// utils/mdx.ts
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const DOCS_DIRECTORY = path.join(process.cwd(), 'app', 'docs')

/**
 * docs 디렉토리 내의 모든 MDX 파일을 재귀적으로 찾습니다.
 */
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
export function getDocBySlug(slug: string) {
    const filePath = path.join(DOCS_DIRECTORY, `${slug}.mdx`)
    return getMatter(filePath)
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

    // 정렬이 필요한 경우 여기서 처리
    return docs.sort((a, b) => {
        if (a.order && b.order) {
            return a.order - b.order
        }
        return 0
    })
}