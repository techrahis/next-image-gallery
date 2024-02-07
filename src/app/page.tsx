export default function Home() {
  return (
    <main>
      <section>
        <h1 className="text-4xl font-bold mt-12">NEXT.js Image Gallery V2</h1>
        <p className="text-lg mt-6 bg-sky-600 p-6 rounded-lg">
          This page <strong>fetches and caches data at build time</strong>. Even
          though the Unsplash API always returns a new image, we see the same
          image after refreshing the page until we compile the project again.
        </p>
      </section>
    </main>
  );
}
