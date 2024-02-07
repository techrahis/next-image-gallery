import { UnsplashImage } from "@/types/unsplash-image-type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 0;

// export const dynamicParams = false;

interface PageProps {
  params: { topic: string };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: `${topic} - Image Gallery`,
  };
}

// This function is called at build time and returns an array of possible values for topic (nature, fitness, coding) that will be used to generate static pages.

export function generateStaticParams() {
  return ["health", "nature", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_API_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <section>
        <h1 className="text-4xl font-bold mt-12">Images of {topic}</h1>
        <p className="text-lg mt-6 bg-sky-600 p-6 rounded-lg">
          This page uses <strong>generateStaticParams</strong> to render and
          cache static pages at build time, even though the URL has a dynamic
          parameter. Pages that are not included in generateStaticParams will be
          fetched & rendered on first access and then{" "}
          <strong>cached for subsequent requests</strong> (this can be
          disabled).
        </p>
      </section>
      <div className="flex flex-wrap justify-center my-10">
        {images.map((image) => (
          <div
            className="relative m-2"
            style={{ width: 500, height: 500 }}
            key={image.description}
          >
            <Image
              className="absolute inset-0 object-cover bg-slate-700"
              alt={image.description}
              src={image.urls.regular}
              layout="fill"
              objectFit="cover"
            />
            <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-tr-lg">
              by{" "}
              <Link
                className="text-sky-500"
                href={`user/${image.user.username}`}
              >
                {image.user.username}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
