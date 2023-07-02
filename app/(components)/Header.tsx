"use client";

import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex items-center p-4 shadow-md shadow-violet-300 rounded-b-xl bg-violet-800">
      <Link href="/">
        <h1 className="text-2xl font-bold">Outfit Builder</h1>
      </Link>
      {user && (
        <Link href="/create">
          <h1 className="text-2xl ml-4">Create</h1>
        </Link>
      )}
      <Link href="/products">
        <h1 className="text-2xl ml-4">Products</h1>
      </Link>
      <div className="flex-grow" />
      {user && (
        <div>
          {user?.fullName} | <SignOutButton />
        </div>
      )}
      {!user && <SignInButton />}
    </header>
  );
}
