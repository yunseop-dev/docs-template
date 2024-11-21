export default function Aside() {
  return (
    <aside className="sticky top-14 h-[calc(100vh-4rem)] border-r overflow-y-auto py-8 pr-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-1 px-2 py-1">
            Category 1
          </h4>
          <div className="grid gap-0.5 text-sm">
            <a href="/docs" className="px-2 py-1 hover:underline">
              Doc 1
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-1 px-2 py-1">
            Category 2
          </h4>
          <div className="grid gap-0.5 text-sm">
            <a
              href="/docs/components/accordion"
              className="px-2 py-1 hover:underline"
            >
              Doc 2
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}