"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        {user && (
          <figure>
            <Link href={`/profile/${user?.id}`}>
              <Image
                src={user.image || "/assets/images/dummy.jpg"}
                alt={user.name || "User profile"}
                width={24}
                height={24}
                className="rounded-full"
              />
            </Link>

            <button
              className="cursor-pointer"
              onClick={() => {
                authClient.signOut();
                redirect("/sign-in");
              }}
              aria-label="Sign out"
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="Sign out"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
