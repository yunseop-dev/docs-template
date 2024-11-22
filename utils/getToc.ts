// utils/getToc.ts
import { getFiles, getMatter } from './mdx'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import slugify from 'slugify'

interface TocItem {
    title: string
    url: string
    depth: number
    children?: TocItem[]
}

interface ParsedHeading {
    depth: number
    title: string
    url: string
}

/**
 * 마크다운 헤딩을 파싱하여 목차 아이템으로 변환
 */
async function parseHeadings(content: string): Promise<ParsedHeading[]> {
    const headings: ParsedHeading[] = []

    await remark()
        .use(remarkMdx)
        .use(remarkGfm)
        .use(() => (tree) => {
            visit(tree, 'heading', (node: any) => {
                const title = toString(node)
                const url = `#${slugify(title, { lower: true })}`

                headings.push({
                    depth: node.depth,
                    title,
                    url,
                })
            })
        })
        .process(content)

    return headings
}

/**
 * 평면 구조의 헤딩을 계층 구조로 변환
 */
function buildTocTree(headings: ParsedHeading[]): TocItem[] {
    const root: TocItem[] = []
    const stack: TocItem[] = []

    headings.forEach((heading) => {
        const item: TocItem = {
            title: heading.title,
            url: heading.url,
            depth: heading.depth,
        }

        if (!stack.length) {
            stack.push(item)
            root.push(item)
            return
        }

        while (stack.length) {
            const lastItem = stack[stack.length - 1]
            if (heading.depth > lastItem.depth) {
                if (!lastItem.children) lastItem.children = []
                lastItem.children.push(item)
                stack.push(item)
                break
            }
            stack.pop()
        }

        if (!stack.length) {
            stack.push(item)
            root.push(item)
        }
    })

    return root
}

/**
 * 단일 문서의 목차 생성
 */
export async function generateTocForDocument(content: string) {
    const headings = await parseHeadings(content)
    return buildTocTree(headings)
}

/**
 * 전체 문서의 목차 생성
 */
export async function generateToc() {
    const files = await getFiles()
    const toc: Record<string, TocItem[]> = {}

    for (const file of files) {
        const { data, content } = await getMatter(file)
        const slug = data.slug

        if (slug) {
            toc[slug] = await generateTocForDocument(content)
        }
    }

    return toc
}