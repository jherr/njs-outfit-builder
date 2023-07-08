"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center p-4 shadow-md shadow-violet-300 rounded-b-xl bg-violet-800">
      <Link href="/">
        <h1 className="text-2xl font-bold">Outfit Builder</h1>
      </Link>
      <Link href="/create">
        <h1 className="text-2xl ml-4">Create</h1>
      </Link>
    </header>
  );
}
