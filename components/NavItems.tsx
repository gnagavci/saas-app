"use client"; //since we are using pathname, which is rendered client-side

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// the navigation items are saved as an array of object, and return-mapped in the component return, allows for easy modification
const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(pathname === href && "text-primary font-semibold")}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
