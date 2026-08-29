import Image from "next/image";
import Link from "next/link";
import { FileDown, Mail } from "lucide-react";

import aboutBanner from "@/assets/img/about-banner.jpg";

export const metadata = {
  title: "About",
};

const linkClass = "font-medium text-red-600 underline-offset-2 hover:underline dark:text-red-400";

export default function About() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Image
          src={aboutBanner}
          alt=""
          placeholder="blur"
          priority
          className="h-auto w-full rounded-xl"
        />

        <h1 className="font-display mt-8 text-3xl font-light tracking-wide sm:text-4xl">
          <span className="text-red-600 dark:text-red-400">Hi.</span> My name is Prateek Sahay.
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <article className="space-y-6 text-muted-foreground lg:col-span-2">
            <p>
              I'm deeply passionate about robotics and entrepreneurship. I started my career after graduating from
              Worcester Polytechnic Institute (WPI), earning dual Bachelor's degrees in Robotics and Mechanical
              Engineering. My first job was at{" "}
              <Link href="/portfolio/sikorsky" className={linkClass}>
                Sikorsky Aircraft
              </Link>{" "}
              designing software for autonomous helicopters for the DARPA ALIAS program. Then, I went to{" "}
              <a
                href="https://www.uber.com/us/en/atg/research-and-development/perception-and-prediction/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Uber ATG
              </a>{" "}
              to design software for self-driving cars. From 2020-2022, I studied at UC Berkeley earning dual MBA/MEng
              degrees, after which I became a Product Manager working on self-driving cars at{" "}
              <a href="https://waymo.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Waymo
              </a>
              . Soon after, I founded a startup called{" "}
              <a
                href="https://procurespark.ai"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                ProcureSpark
              </a>{" "}
              to accelerate the way companies apply for bids and proposals (RFPs) using AI.
            </p>

            <p>
              Outside of work, I enjoy giving back to the community through volunteer work; I've{" "}
              <Link href="/portfolio/frcsim" className={linkClass}>
                mentored for FIRST Robotics
              </Link>
              , volunteered at the Museum of Science in Boston, and done some graphic design work for{" "}
              <a
                href="http://www.essenceofindia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Essence of India
              </a>
              , an annual celebration of classical Indian culture and heritage in my hometown.
            </p>

            <p>
              In my free time, I practice badminton, photography, and woodworking. I've always thrived at the
              intersection of disciplined engineering and vibrant arts, so I'm especially drawn to environments where
              I can continue learning both.
            </p>

            <section className="space-y-4 pt-4">
              <h2 className="font-display text-xl font-medium text-foreground">About the Website</h2>
              <p>
                I designed the theme for this website on my own and coded it up using{" "}
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Next.js
                </a>
                ,{" "}
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Tailwind CSS
                </a>
                , and{" "}
                <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  shadcn/ui
                </a>
                . It was my first foray into HTML/CSS in 2011, and it's been a lot of fun ever since. Enjoy!
              </p>
            </section>

            <p className="font-medium text-red-600 dark:text-red-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </article>

          <aside className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a href="mailto:ptkinvent@gmail.com" className="hover:underline">
                ptkinvent@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2 font-semibold">
              <FileDown className="size-4 shrink-0" />
              <a href="/ResumePrateekSahay.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Download my r&eacute;sum&eacute;
              </a>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
