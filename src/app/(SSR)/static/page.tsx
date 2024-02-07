import { UnsplashImage } from "@/types/unsplash-image-type";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Static Page - Image Gallery",
  description: "This is a static page.",
};

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_ACCESS_KEY}`
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <main>
      <section>
        <h1 className="text-4xl font-bold mt-12">Static Image</h1>
        <p className="text-lg mt-6 bg-sky-600 p-6 rounded-lg">
          This page <strong>fetches and caches data at build time</strong>. Even
          though the Unsplash API always returns a new image, we see the same
          image after refreshing the page until we compile the project again.
        </p>
      </section>
      <section className="my-10 flex justify-center">
        <div className="relative">
          <Image
            className="rounded-lg bg-slate-700"
            alt={image.description}
            src={image.urls.regular}
            width={width}
            height={height}
          />
          <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-tr-lg">
            by{" "}
            <Link className="text-sky-500" href={`user/${image.user.username}`}>
              {image.user.username}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
