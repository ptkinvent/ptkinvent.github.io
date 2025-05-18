"use client";

import { usePathname } from "next/navigation";
import { blogs } from "@/data/blogs";
import Breadcrumbs from "@/components/breadcrumbs";
import Image from "next/image";

export default function BlogHeading() {
  const pathname = usePathname();

  let crumbs = [];
  const blog = blogs.find((blog) => blog.slug === pathname.split("/").pop());
  crumbs = [
    { label: "Blog", href: "/blog" },
    { label: blog.title, href: null },
  ];

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />

          <Breadcrumbs crumbs={crumbs} />

          <Image src={blog.bannerImg} className="w-100 h-auto" alt="" placeholder="blur" />

          <h1 className="mt-3 mb-2">{blog.title}</h1>
          <p className="text-danger">{blog.date}</p>
        </div>
      </div>
    </div>
  );
}
