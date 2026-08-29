import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

import Foodlist from "@/components/foodlist";
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
    <div className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Image src={foodlistBanner} alt="" placeholder="blur" priority className="h-auto w-full rounded-xl" />

        <h1 className="font-display mt-8 text-3xl font-light tracking-wide sm:text-4xl">
          <span className="text-red-600 dark:text-red-400">Eat.</span> Restaurants worth trying.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Search or filter by city and cuisine to find something good. I love exploring new restaurants but don't
          enjoy eating alone, so feel free to{" "}
          <a href="mailto:ptkinvent@gmail.com" className="font-medium text-red-600 hover:underline dark:text-red-400">
            message me
          </a>{" "}
          if you'd like to try any of these together!
        </p>
        <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Foodlist cities={cities} foodlist={foodlist} />
    </div>
  );
}
