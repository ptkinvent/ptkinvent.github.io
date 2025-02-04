import { projects } from "@/data/projects";
import Image from "@/components/image";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "cht4");

  return {
    title: project.title,
  };
}

export default function CHT4() {
  const project = projects.find((project) => project.id === "cht4");

  return (
    <>
      <div className="jumbotron page-header" style={{ backgroundImage: `url('${project.bannerImg}')` }}>
        <div className="container">
          <h1 className="page-title">{project.title}</h1>
          <hr />
          <h4 className="page-subtitle">{project.subtitle}</h4>
          <h4 className="page-detail">{project.detail}</h4>
        </div>
      </div>

      <div className="container">
        {/* 01 Background */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">01</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">01&ensp;</span>Background
            </h2>
            <p>
              CHT4 is a startup engineering company based in the Cambridge Innovation Center in Cambridge, MA. The
              company's mission is creating a wide array of innovative products to solve niche problems which require
              cutting-edge technology and design. I interned with the CEO and founder, Charles Terrill, designing some
              of these projects in SolidWorks and designing some prototypes in a workshop in Somerville, MA.
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">02</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">02&ensp;</span>Continuous Variable Bike Transmission
            </h2>
            <p>
              I worked at CHT4 on a variety of unrelated projects that challenged my engineering design skills and
              stretched my critical thinking abilities. The idea behind the company was to create a large quanitity of
              new types of products and market the ones that consumers found most appealing. My first project was
              designing a gear system for bicycles that would do away with the traditional method of switching a chain
              between multiple sprockets, replacing it instead with a single sprocket that could change size. This
              proved a difficult design challenge, but eventually I solved the challenges and modeled the design in
              SolidWorks. An added benefit of this design is that riders can change to a different gear while standing
              in place, which can be helpful when stopped at a stoplight on a hill, for instance.
            </p>
          </div>
        </div>

        <Image
          src="/img/cht4-bike.gif"
          caption="A CVT design for bicycles."
          title="Contracting and expanding bicycle gears."
        />

        {/* 03 Development */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">03</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">03&ensp;</span>High-Powered Air Conditioners
            </h2>
            <p>
              Other projects I worked on include a large portable battery capable of powering 110 Volt outlets for
              powering desktop computers and other large devices on-the-go, an ecologically friendly way of heating
              water for homes, and a new type of air conditioner that promised ten times more power than a traditional
              one without obstructing your entire windows.
            </p>
          </div>
        </div>

        <Image
          src="/img/cht4-air-conditioner.jpg"
          caption="Powerful home cooling units that don't obstruct windows."
          title="Powerful home cooling units that don't obstruct windows."
        />

        <div className="row">
          <div className="offset-md-3 col-md-6">
            <p>
              Although none of these designs made it to market, I gained a lot of insight into the patent process and a
              look at a healthy environment for entrepreneurship. I learned how helpful other founders can be and how
              valuable their advice can be.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
