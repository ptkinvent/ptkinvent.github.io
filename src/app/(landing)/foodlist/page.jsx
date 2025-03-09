import Foodlist from "@/components/foodlist";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Foodlist",
};

export default async function FoodListPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: cities } = await supabase.from("cities").select();
  const { data: foodlist } = await supabase.from("foodlist").select();

  return (
    <>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", marginTop: "20px", marginBottom: "20px" }} />
          <img src="/img/foodlist-banner.jpg" className="header-img" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="about-intro">
            <span className="text-danger">Eat.</span> These are some restaurants I want to try.
          </h2>
          <p>
            I love exploring new restaurants, but I don't enjoy eating alone. Feel free to{" "}
            <a href="mailto:ptkinvent@gmail.com">message me</a> if you'd like to try any of these together!
          </p>
          <p className="text-primary">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Foodlist cities={cities} foodlist={foodlist} />
    </>
  );
}
