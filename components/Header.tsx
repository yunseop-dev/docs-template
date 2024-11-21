import {
  Button,
  Input,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui";
import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm border-b border-zinc-200/40">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center gap-2 text-zinc-900">
            <span className="font-bold">Logo</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-6 text-sm">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/docs"
                  className="text-zinc-900/80 hover:text-zinc-900 transition-colors"
                >
                  Menu 1
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex w-8 h-8 mr-2"
        >
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="w-64 relative">
            <Input
              className="h-8 w-full bg-zinc-100/50 px-4 text-sm text-zinc-500 border-zinc-200"
              placeholder="Search documentation..."
            />
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-600 flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <nav className="flex gap-0.5">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/shadcn-ui/ui"
                className="text-zinc-900"
              >
                <span className="sr-only">GitHub</span>
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
