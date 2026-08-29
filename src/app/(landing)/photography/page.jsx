import Image from "next/image";

import PhotoGrid from "@/components/photogrid";
import photographyBanner from "@/assets/img/photography-banner.jpg";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photography",
};

export default function PhotographyPage() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Image
          src={photographyBanner}
          alt=""
          placeholder="blur"
          priority
          className="h-auto w-full rounded-xl"
        />

        <h1 className="font-display mt-8 text-3xl font-light tracking-wide sm:text-4xl">
          <span className="text-red-600 dark:text-red-400">Take.</span> Photos worth sharing.
        </h1>
        <p className="mt-4 text-muted-foreground">
          I enjoy taking photos to preserve the beauty of everyday moments, and I love sharing them with friends
          outside of social media.
        </p>
        <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <PhotoGrid />
    </div>
  );
}
