"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedTopic, setSelectedTopic] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
    if (event.target.value === "") {
      router.push(`/`);
    } else {
      router.push(`/topic/${event.target.value}`);
    }
  };

  return (
    <header className="bg-sky-800 sm:items-center text-white px-2 py-4 flex flex-col sm:flex-row sm:justify-between sm:px-10">
      <Link href={"/"}>
        <section>
          <h1 className="text-2xl font-bold mb-4 sm:mb-0  ">Image Gallery</h1>
        </section>
      </Link>
      <section className="flex flex-col items-center space-y-4">
        <section className="flex items-center space-x-2 sm:space-x-4">
          <Link href={"/static"}>
            <h2 className={pathname === "/static" ? "text-orange-500" : ""}>
              Static
            </h2>
          </Link>
          <Link href={"/dynamic"}>
            <h2 className={pathname === "/dynamic" ? "text-orange-500" : ""}>
              Dynamic
            </h2>
          </Link>
          <Link href={"/isr"}>
            <h2 className={pathname === "/isr" ? "text-orange-500" : ""}>
              ISR
            </h2>
          </Link>
          <Link href={"/search"}>
            <h2 className={pathname === "/search" ? "text-orange-500" : ""}>
              Search
            </h2>
          </Link>
        </section>
        <section className="flex items-center">
          <div>
            <label htmlFor="topics" className="sr-only text-white">
              Select a topic
            </label>
            <select
              onChange={handleSelectChange}
              id="topics"
              className={`rounded-md px-3 py-2 bg-sky-600 outline-none ${
                selectedTopic ? "text-orange-500" : ""
              }`}
            >
              <option className="text-white" value="">
                Select a topic
              </option>
              <option
                value="health"
                className={
                  selectedTopic === "health" ? "text-orange-500" : "text-white"
                }
              >
                Health
              </option>
              <option
                value="nature"
                className={
                  selectedTopic === "nature" ? "text-orange-500" : "text-white"
                }
              >
                Nature
              </option>
              <option
                value="fitness"
                className={
                  selectedTopic === "fitness" ? "text-orange-500" : "text-white"
                }
              >
                Fitness
              </option>
              <option
                value="coding"
                className={
                  selectedTopic === "coding" ? "text-orange-500" : "text-white"
                }
              >
                Coding
              </option>
            </select>
          </div>
        </section>
      </section>
    </header>
  );
}
