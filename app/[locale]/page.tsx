export async function generateStaticParams() {
    return [{
      locale: 'en',
      slug: []
    }]
  }
export default function Home() {
    return (
      <div>
        <main>
          Locale Home
        </main>
      </div>
    );
  }
  