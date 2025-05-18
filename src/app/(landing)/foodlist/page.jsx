import Foodlist from "@/components/foodlist";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import foodlistBanner from "@/assets/img/foodlist-banner.jpg";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Foodlist",
};

export default async function FoodListPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: cities } = await supabase.from("cities").select().order("order");
  const { data: foodlist } = await supabase.from("foodlist").select().order("order");

  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />
          <Image src={foodlistBanner} className="w-100 h-auto" alt="" placeholder="blur" />
          <h2 className="landing-header">
            <span className="text-danger">Eat.</span> These are some restaurants I want to try.
          </h2>
          <p>
            I love exploring new restaurants, but I don't enjoy eating alone. Feel free to{" "}
            <a href="mailto:ptkinvent@gmail.com">message me</a> if you'd like to try any of these together!
          </p>
          <p className="text-primary-emphasis">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Foodlist cities={cities} foodlist={foodlist} />
    </>
  );
}
