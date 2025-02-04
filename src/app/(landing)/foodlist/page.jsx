import Foodlist from "@/components/foodlist";
import { foodlist } from "@/data/foodlist";

export const metadata = {
  title: "Foodlist",
};

export default function FoodListPage() {
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

      <Foodlist foodlist={foodlist} />
    </>
  );
}
