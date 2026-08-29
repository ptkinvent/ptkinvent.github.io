"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/watchlist", label: "Watchlist" },
  { href: "/foodlist", label: "Foodlist" },
  { href: "/photography", label: "Photography" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    applyTheme(stored);
    setTheme(stored);
  }, []);

  function handleChangeTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("theme", next);
      return next;
    });
  }

  function isActive(href) {
    return href === "/blog" ? pathname.includes("/blog") : pathname === href;
  }

  return (
    <header className="fixed top-0 z-50 h-[70px] w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-wide text-white no-underline hover:no-underline!"
        >
          Prateek Sahay
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-neutral-300 no-underline transition-colors hover:text-white hover:no-underline!",
                isActive(link.href) && "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-300 hover:bg-white/10 hover:text-white"
            onClick={handleChangeTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>

          <SignedOut>
            <SignInButton>
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 no-underline hover:bg-accent hover:text-foreground hover:no-underline!",
                      isActive(link.href) && "bg-accent text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="border-border mt-2 flex items-center justify-between border-t px-4 pt-4">
              <SignedOut>
                <SignInButton>
                  <Button variant="secondary" size="sm">
                    Sign in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <Button variant="ghost" size="icon" onClick={handleChangeTheme} aria-label="Toggle theme">
                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
