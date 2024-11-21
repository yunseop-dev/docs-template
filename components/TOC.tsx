export default function TOC() {
  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
        <div className="no-scrollbar h-full overflow-auto pb-10">
          <div className="space-y-2">
            <p className="font-medium">On This Page
            </p>
            <ul className="m-0 list-none">
              <li className="mt-0 pt-2">
                <a href="#installation" className="inline-block no-underline transition-colors hover:text-foreground font-medium text-foreground">Lorem
                </a>
              </li>
              <li className="mt-0 pt-2">
                <a href="#sidebarprovider" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">Ipsum
                </a>
                <ul className="m-0 list-none pl-4">
                  <li className="mt-0 pt-2">
                    <a href="#props" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">dolor
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="group relative flex flex-col gap-2 rounded-lg border p-4 text-sm mt-6 max-w-[80%]">
            <div className="text-balance text-lg font-semibold leading-tight group-hover:underline">Title</div>
            <div>Description</div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs mt-2 w-fit">Button</button>
            <a target="_blank" rel="noreferrer" className="absolute inset-0" href="https://vercel.com/new?utm_source=shadcn_site&amp;utm_medium=web&amp;utm_campaign=docs_cta_deploy_now_callout">
              <span className="sr-only">Button 2</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}