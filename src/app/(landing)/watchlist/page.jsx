import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

import Watchlist from "@/components/watchlist";
import watchlistBanner from "@/assets/img/watchlist-banner.jpg";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Watchlist",
};

export default async function WatchListPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: watchlist } = await supabase.from("watchlist").select().order("release_date", { ascending: false });

  return (
    <div className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Image src={watchlistBanner} alt="" placeholder="blur" priority className="h-auto w-full rounded-xl" />

        <h1 className="font-display mt-8 text-3xl font-light tracking-wide sm:text-4xl">
          <span className="text-red-600 dark:text-red-400">Watch.</span> Movies and shows I want to see.
        </h1>
        <p className="mt-4 text-muted-foreground">
          I love movies and TV shows but I don't enjoy watching alone. Feel free to{" "}
          <a href="mailto:ptkinvent@gmail.com" className="font-medium text-red-600 hover:underline dark:text-red-400">
            message me
          </a>{" "}
          if you'd like to watch any of these together!
        </p>
        <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Watchlist watchlist={watchlist} />
    </div>
  );
}
