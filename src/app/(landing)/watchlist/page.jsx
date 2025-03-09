import Watchlist from "@/components/watchlist";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Watchlist",
};

export default async function WatchListPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: watchlist } = await supabase.from("watchlist").select();

  return (
    <>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", marginTop: "20px", marginBottom: "20px" }} />
          <img src="/img/watchlist-banner.jpg" className="header-img" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="about-intro">
            <span className="text-danger">Watch.</span> These are some items on my watchlist.
          </h2>
          <p>
            I love movies and TV shows but I don't enjoy watching alone. Feel free to{" "}
            <a href="mailto:ptkinvent@gmail.com">message me</a> if you'd like to watch any of these together!
          </p>
          <p className="text-primary">Last updated: {new Date().toLocaleDateString()}.</p>
        </div>
      </div>

      <Watchlist watchlist={watchlist.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))} />
    </>
  );
}
