"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();
  return (
    <header className="sticky top-0 z-10 flex w-full justify-center border-b bg-white">
      <nav className="flex w-full max-w-screen-2xl items-center gap-1 p-3 md:gap-3">
        <Link href={"/"} className="mr-auto text-xl font-bold">
          MiniSocmed
        </Link>
        {data?.user ? (
          <>
            <Link
              href={`/profile/${data.user.id}`}
              className="rounded-md px-3 py-2 hover:bg-slate-100"
            >
              Profile
            </Link>
            <Link
              href={"/post/new"}
              className="rounded-md px-3 py-2 hover:bg-slate-100"
            >
              New Post
            </Link>
            <button
              className="rounded-md px-3 py-2 hover:bg-slate-100"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
};
export default Header;
