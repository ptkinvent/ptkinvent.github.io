import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { projects } from "@/data/projects";
import indexBanner from "@/assets/img/index-banner.jpg";

export const metadata = {
  title: "Prateek Sahay",
};

export default function Home() {
  const visibleProjects = projects.filter((project) => project.show);

  return (
    <>
      <section className="relative flex h-svh min-h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950 text-white">
        <Image
          src={indexBanner}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/60" />

        <div className="relative flex flex-col items-center gap-4 px-4 text-center">
          <span className="font-display text-sm font-light tracking-[0.5em] text-neutral-200 uppercase sm:text-base">
            Design
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-wide uppercase sm:text-6xl md:text-7xl">
            Prateek Sahay
          </h1>
          <span className="font-display text-sm font-light tracking-[0.5em] text-neutral-200 uppercase sm:text-base">
            Engineering
          </span>
        </div>

        <a
          href="#portfolio"
          title="Portfolio"
          className="absolute bottom-8 flex size-10 animate-bounce items-center justify-center rounded-full border border-white/30 text-white/80 no-underline transition-colors hover:border-white hover:text-white hover:no-underline!"
        >
          <ChevronDown className="size-5" />
        </a>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-[70px] px-4 py-20 sm:px-6">
        <h2 className="font-display mb-12 text-center text-2xl font-light tracking-wide text-foreground sm:text-3xl">
          Portfolio
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block no-underline hover:no-underline!"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-800 ring-1 ring-black/5">
                <Image
                  src={project.thumbnailImg}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-top group-hover:object-bottom"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="translate-y-2 text-xs font-medium text-white/70 transition-transform duration-300 group-hover:translate-y-0">
                    {project.subtitle}
                  </p>
                  <p className="translate-y-2 text-xs text-white/50 transition-transform duration-300 group-hover:translate-y-0">
                    {project.detail}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-center text-sm leading-tight text-foreground">
                <span className="font-display text-red-500">{String(index + 1).padStart(2, "0")}</span>{" "}
                {project.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
