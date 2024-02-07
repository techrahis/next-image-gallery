"use client";

import { UnsplashImage } from "@/types/unsplash-image-type";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mt-12">Search your query</h1>
      <p className="text-lg mt-6 bg-sky-600 p-6 rounded-lg">
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to a NextJS{" "}
        <strong>route handler</strong> that runs on the server. This route
        handler then fetches the data from the Unsplash API and returns it to
        the client.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="mb-3 flex" id="search-input">
          <input
            name="query"
            placeholder="E.g. cats, hotdogs, ..."
            className="mt-6 h-10 block w-full rounded-l px-4 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-sky-500 h-10 mt-6 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-r"
            disabled={searchResultsLoading}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        {searchResultsLoading && (
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        )}
        {searchResultsLoadingIsError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different query!</p>
        )}
      </div>

      {searchResults && (
        <div className="flex flex-wrap justify-center my-10">
          {searchResults.map((image) => (
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
      )}
    </div>
  );
}
