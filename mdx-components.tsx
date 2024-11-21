import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import type { MDXComponents } from 'mdx/types'
import { cn } from './lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
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
  }
}