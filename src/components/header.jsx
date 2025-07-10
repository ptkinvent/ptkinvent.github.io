"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setTheme(theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleChangeTheme(e) {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <nav
      data-bs-theme="dark"
      className="navbar navbar-expand-md navbar-dark bg-dark border-bottom border-tertiary fixed-top"
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          Prateek Sahay
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === "/watchlist" ? "active" : ""}`} href="/watchlist">
                Watchlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === "/foodlist" ? "active" : ""}`} href="/foodlist">
                Foodlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === "/photography" ? "active" : ""}`} href="/photography">
                Photography
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname.includes("/blog") ? "active" : ""}`} href="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === "/about" ? "active" : ""}`} href="/about">
                About
              </Link>
            </li>
            <li className="nav-item d-md-none">
              <SignedOut>
                <SignInButton>
                  <button className="nav-link">Sign in</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
            <li className="nav-item d-md-none">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={theme === "dark"}
                  id="darkModeSwitch"
                  switch="true"
                  onChange={handleChangeTheme}
                />
                <label className="form-check-label" htmlFor="darkModeSwitch">
                  Dark mode
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div className="d-none d-md-flex gap-2 align-items-center">
          <button className="btn btn-dark" onClick={handleChangeTheme}>
            <FontAwesomeIcon fixedWidth icon={theme === "light" ? faMoon : faSun} />
          </button>

          <SignedOut>
            <SignInButton>
              <button className="btn btn-dark">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
