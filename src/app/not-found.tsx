import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center text-center h-screen flex-col">
      <h1 className="text-[2rem] font-extrabold">🔴 404 - Page Not Found!</h1>
      <Link href={"/"}>
        <p className="text-sky-700">👈 Go back home</p>
      </Link>
    </main>
  );
}
