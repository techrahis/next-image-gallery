import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sky-800 py-4 flex flex-col items-center space-y-1 sm:flex-row sm:justify-center sm:space-x-3">
      <Link href={"https://github.com/rajarshisamaddar"}>
        <p>©rajarshisamaddar 2024-2077</p>
      </Link>
      <p>All Rights Reserved</p>
    </footer>
  );
}
