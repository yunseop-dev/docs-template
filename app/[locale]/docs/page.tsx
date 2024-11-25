export async function generateStaticParams() {
  return [{
    locale: 'en',
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
