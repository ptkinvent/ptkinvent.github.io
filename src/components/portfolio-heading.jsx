"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { projects } from "@/data/projects";
import Breadcrumbs from "@/components/breadcrumbs";

export default function PortfolioHeading() {
  const pathname = usePathname();

  const project = projects.find((project) => project.slug === pathname.split("/").pop());
  const crumbs = [
    { label: "Portfolio", href: "/#portfolio" },
    { label: project.title, href: null },
  ];

  return (
    <div className="pt-[70px]">
      <div className="relative flex h-72 w-full items-end overflow-hidden bg-neutral-900 sm:h-96">
        <Image
          src={project.bannerImg}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative mx-auto w-full max-w-3xl px-4 pb-8 text-white sm:px-6">
          <h1 className="font-display text-3xl font-light tracking-wide sm:text-4xl">{project.title}</h1>
          <p className="mt-2 text-sm text-white/70 italic sm:text-base">{project.subtitle}</p>
          <p className="text-sm text-white/70 sm:text-base">{project.detail}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
      </div>
    </div>
  );
}
