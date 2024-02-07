import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Gallery",
  description:
    "Learn how to build an image gallery with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className} min-h-screen`}>
        <Navbar />
        <main className="mx-10 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
