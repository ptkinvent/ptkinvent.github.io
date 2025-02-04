"use client";

import { projects } from "@/data/projects";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const active = usePathname();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Prateek Sahay
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li
              className={`nav-item ${active === "/" || active.includes("/projects") ? "active" : ""} d-none d-md-block`}
            >
              <Link className="nav-link" href="/#portfolio">
                Portfolio
              </Link>
            </li>
            <li className={`nav-item ${active === "/" ? "active" : ""} dropdown d-block d-md-none`}>
              <Link
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Portfolio
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {projects
                  .filter((project) => project.show)
                  .map((project, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                      <Link className="dropdown-item" href={`/projects/${project.id}`}>
                        <span className="text-danger">{String(index + 1).padStart(2, "0")}</span> {project.title}
                      </Link>
                    </div>
                  ))}
              </div>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active === "/watchlist" ? "active" : ""}`} href="/watchlist">
                Watchlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active === "/foodlist" ? "active" : ""}`} href="/foodlist">
                Foodlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active.includes("/blog") ? "active" : ""}`} href="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active === "/about" ? "active" : ""}`} href="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
