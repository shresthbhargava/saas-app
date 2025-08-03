import Link from "next/link";
import Image from "next/image";
import Navitems from "@/components/Navitems";
const Navbar = () => {
    return(
    <nav className="navbar">
        <Link href="/public">
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={46}
                    height={44}
                    />
            </div>
        </Link>
        <div className="flex items-center gap-8">
            <Navitems/>
            <p>Sign In</p>
        </div>
    </nav>
    )
}
export default Navbar