"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { blogs } from "@/data/blogs";
import Breadcrumbs from "@/components/breadcrumbs";

export default function BlogHeading() {
  const pathname = usePathname();

  const blog = blogs.find((blog) => blog.slug === pathname.split("/").pop());
  const crumbs = [
    { label: "Blog", href: "/blog" },
    { label: blog.title, href: null },
  ];

  return (
    <div className="pt-[70px]">
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />

        <Image src={blog.bannerImg} alt="" placeholder="blur" priority className="h-auto w-full rounded-xl" />

        <h1 className="font-display mt-6 mb-2 text-3xl font-light tracking-wide sm:text-4xl">{blog.title}</h1>
        <p className="font-medium text-red-600 dark:text-red-400">{blog.date}</p>
      </div>
    </div>
  );
}
