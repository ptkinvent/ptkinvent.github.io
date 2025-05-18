import Watchlist from "@/components/watchlist";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
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
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />
          <Image src={watchlistBanner} className="w-100 h-auto" alt="" placeholder="blur" />
          <h2 className="landing-header">
            <span className="text-danger">Watch.</span> These are some items on my watchlist.
          </h2>
          <p>
            I love movies and TV shows but I don't enjoy watching alone. Feel free to{" "}
            <a href="mailto:ptkinvent@gmail.com">message me</a> if you'd like to watch any of these together!
          </p>
          <p className="text-primary-emphasis">Last updated: {new Date().toLocaleDateString()}.</p>
        </div>
      </div>

      <Watchlist watchlist={watchlist} />
    </>
  );
}
