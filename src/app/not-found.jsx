import Image from "next/image";
import Link from "next/link";

import errorBanner from "@/assets/img/error-architecture.png";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 pt-[70px] text-white">
      <Image
        src={errorBanner}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />

      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <p className="font-display text-7xl font-semibold tracking-wide sm:text-8xl">404</p>
        <p className="font-display text-xl font-light text-white/80">Page not found</p>
        <p className="text-sm text-white/60 italic">It's a feature, not a bug</p>
        <Link
          href="/"
          className="mt-4 rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white no-underline transition-colors hover:border-white hover:bg-white/10 hover:no-underline!"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
