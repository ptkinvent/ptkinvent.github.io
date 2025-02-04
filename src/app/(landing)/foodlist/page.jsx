import { foodlist } from "@/data/foodlist";

export const metadata = {
  title: "Foodlist",
};

function RestaurantCity({ cityId, city }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="mb-0">
          <button
            className="btn btn-lg btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${cityId}`}
          >
            <i className="fa fa-map-pin"></i>&nbsp;{city.name}{" "}
            <span className="text-secondary">
              <i className="fa fa-caret-down"></i>
            </span>
          </button>
        </h4>
      </div>
      <div id={`collapse${cityId}`} className="collapse">
        <div className="card-body">
          {city.restaurants.map((restaurant, index) => (
            <Restaurant key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Restaurant({ restaurant }) {
  let badge = "";
  switch (restaurant.status) {
    case "visited":
      badge = <span className="badge badge-success">Visited</span>;
      break;
    case "closed":
      badge = <span className="badge badge-danger">Closed</span>;
      break;
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={restaurant.img} className="w-100" height="180px" style={{ objectFit: "cover" }} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <a href={restaurant.link} target="_blank">
                {restaurant.name}
              </a>{" "}
              {badge}
            </h5>
            <p className="card-text">{restaurant.description}</p>
            <p className="card-text">
              <small className="text-muted">{restaurant.cuisine}</small>
            </p>
          </div>
        </div>
      </div>
      {restaurant.notes && <div className="card-footer">{restaurant.notes}</div>}
    </div>
  );
}

export default function FoodList() {
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

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <div className="accordion">
            {foodlist.map((city, cityId) => (
              <RestaurantCity key={cityId} city={city} cityId={cityId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
