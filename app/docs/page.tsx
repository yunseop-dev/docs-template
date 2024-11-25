export async function generateStaticParams() {
  return [{
    slug: ['docs']
  }]
}
export default function Home() {
  return (
    <div>
      <main>
        docs Home
      </main>
    </div>
  );
}
