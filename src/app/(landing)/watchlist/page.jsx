import Watchlist from "@/components/watchlist";
import { watchlist } from "@/data/watchlist";

export const metadata = {
  title: "Watchlist",
};

export default function WatchListPage() {
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

      <Watchlist watchlist={watchlist} />
    </>
  );
}
