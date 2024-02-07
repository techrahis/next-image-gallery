import { UnsplashUser } from "@/types/unsplash-user-type";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
// import { cache } from "react";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_API_ACCESS_KEY}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

// const getUserCached = cache(getUser) Use cache if not using the native fetch

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - Image Gallery",
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const user = await getUser(username);

  return (
    <div>
      <h1 className="text-4xl font-bold mt-12">User Details</h1>
      <p className="text-lg mt-6 bg-sky-600 p-6 rounded-lg">
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </p>

      <section className="mt-10">
        <h1 className="font-semibold text-xl">Username: {user.username}</h1>
        <p className="font-semibold text-xl mt-1">
          First name: {user.first_name}
        </p>
        <p className="font-semibold text-xl mt-1">
          Last name: {user.last_name}
        </p>
        <Link href={"https://unsplash.com/" + user.username}>
          <button className="mt-4 bg-sky-500 px-4 py-2 rounded-lg">
            Unsplash profile
          </button>
        </Link>
      </section>
    </div>
  );
}
