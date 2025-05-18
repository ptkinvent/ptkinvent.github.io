"use client";

import { usePathname } from "next/navigation";
import { projects } from "@/data/projects";
import Breadcrumbs from "./breadcrumbs";

export default function PortfolioHeading() {
  const pathname = usePathname();
  const project = projects.find((project) => project.slug === pathname.split("/").pop());
  const crumbs = [
    { label: "Portfolio", href: "/#portfolio" },
    { label: project.title, href: null },
  ];

  return (
    <>
      <div className="jumbotron project-header" style={{ backgroundImage: `url('${project.bannerImg.src}')` }}>
        <div className="container">
          <h1 className="project-title">{project.title}</h1>
          <hr />
          <h4 className="project-subtitle">{project.subtitle}</h4>
          <h4 className="project-detail">{project.detail}</h4>
        </div>
      </div>

      <div className="container mb-2">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        </div>
      </div>
    </>
  );
}
