import Link from "next/link";
import Image from "next/image";
import Navitems from "@/components/Navitems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={46}
            height={44}
          />
          <span className="font-bold text-xl">Converso</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <SignedIn>
          <Navitems />
        </SignedIn>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="btn-signin">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;