import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { getDocBySlug, getMdxFiles } from '@/utils/mdx'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import { cn } from '@/lib/utils'
import { generateTocForDocument } from '@/utils/getToc'
import { getNavigationData } from '@/utils/navigation'
import { DocNavigation } from '@/components/DocNavigation'
import { TableOfContents } from '@/components/TableOfContents'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { data } = await getDocBySlug(params.slug.join('/'))

  return {
    title: `${data.title} | Documentation`,
    description: data.description,
  }
}

export async function generateStaticParams() {
  const posts = await getMdxFiles()
  return posts
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params
  const currentSlug = slug.join('/')
  const { content } = await getDocBySlug(currentSlug)
  const toc = await generateTocForDocument(content)
  const navigation = await getNavigationData(currentSlug)
  console.log('navigation', navigation);

  // MDX 파일 읽기
  const filePath = path.join(process.cwd(), 'content', `${slug.join('/')}.mdx`)

  try {
    const source = fs.readFileSync(filePath, 'utf8')

    const { content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true, mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypePrism, { showLineNumbers: true }],
          ],
        },
      },
      components: {
        h1: ({ children, ...props }) => <h1 {...props} className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', props.className)}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 {...props} className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', props.className)}>{children}</h2>,
        h3: ({ children, ...props }) => <h3 {...props} className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.className)}>{children}</h3>,
        h4: ({ children, ...props }) => <h4 {...props} className={cn('scroll-m-20 text-xl font-semibold tracking-tight', props.className)}>{children}</h4>,
        p: ({ children, ...props }) => <p {...props} className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>{children}</p>,
        blockquote: ({ children, ...props }) => <blockquote {...props} className={cn('mt-6 border-l-2 pl-6 italic', props.className)}>{children}</blockquote>,
        table: ({ children, ...props }) => <table {...props} className={cn('w-full', props.className)}>{children}</table>,
        tr: ({ children, ...props }) => <tr {...props} className={cn('m-0 border-t p-0 even:bg-muted', props.className)}>{children}</tr>,
        th: ({ children, ...props }) => <th {...props} className={cn('border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right', props.className)}>{children}</th>,
        td: ({ children, ...props }) => <td {...props} className={cn('border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right', props.className)}>{children}</td>,
        ul: ({ children, ...props }) => <ul {...props} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)}>{children}</ul>,
        code: ({ children, ...props }) => <code {...props} className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', props.className)}>{children}</code>,
        small: ({ children, ...props }) => <small {...props} className={cn('text-sm font-medium leading-none', props.className)}>{children}</small>,
        wrapper: ({ children }) => (<div>
          <Breadcrumb className='mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </div>)
      },
    })

    return (
      <div className="flex gap-8 max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <article className="prose prose-slate max-w-none">
            {content}
          </article>

          <DocNavigation prev={navigation.prev} next={navigation.next} />
        </div>
        <TableOfContents items={toc} />
      </div>
    )
  } catch {
    notFound()
  }
}