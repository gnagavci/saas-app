import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          {/*  Check video at 30:41*/}
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={46}
            height={44}
          ></Image>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems/>
        <p>Sign In</p>
      </div>
    </nav>
  );
};

export default Navbar;
