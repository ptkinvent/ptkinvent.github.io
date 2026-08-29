import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogs } from "@/data/blogs";
import uberKrypton from "@/assets/img/uber-krypton.jpg";

export const metadata = {
  title: "Blog",
};

export default function Blog() {
  const visiblePosts = blogs.filter((blog) => blog.show);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Image src={uberKrypton} alt="" placeholder="blur" priority className="h-auto w-full rounded-xl" />

        <h1 className="font-display mt-8 text-3xl font-light tracking-wide sm:text-4xl">
          <span className="text-red-600 dark:text-red-400">Welcome.</span> This is my blog.
        </h1>
        <p className="mt-4 text-muted-foreground">
          I got started in software later than many of my friends, and I can appreciate just how steep the learning
          curve can be. My hope for this blog is to ease the journey for others&mdash;and to remind myself just how
          much more I have to learn!
        </p>

        <h2 className="font-display mt-12 mb-6 text-xl font-medium text-foreground">Posts</h2>

        <div className="space-y-8">
          {visiblePosts.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group block no-underline hover:no-underline!"
            >
              <div className="overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20">
                <div className="relative aspect-2/1 w-full overflow-hidden bg-neutral-800">
                  <Image
                    src={blog.bannerImg}
                    alt=""
                    placeholder="blur"
                    fill
                    sizes="(min-width: 640px) 672px, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-medium text-foreground">{blog.title}</h3>
                  <p className="mt-1 text-sm font-medium text-red-600 dark:text-red-400">{blog.date}</p>
                  <p className="mt-3 text-muted-foreground">{blog.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Read more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
