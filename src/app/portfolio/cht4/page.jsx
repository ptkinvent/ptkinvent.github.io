import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import cht4Bike from "@/assets/img/cht4-bike.gif";
import cht4AirConditioner from "@/assets/img/cht4-air-conditioner.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "cht4");

  return {
    title: project.title,
  };
}

export default function CHT4() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              CHT4 is a startup engineering company based in the Cambridge Innovation Center in Cambridge, MA. The
              company's mission is creating a wide array of innovative products to solve niche problems which require
              cutting-edge technology and design. I interned with the CEO and founder, Charles Terrill, designing some
              of these projects in SolidWorks and designing some prototypes in a workshop in Somerville, MA.
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <ResponsiveHeading numbering="02">Continuous Variable Bike Transmission</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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

        <ResponsiveCaption caption="A CVT design for bicycles.">
          <Image
            src={cht4Bike}
            className="w-100 h-auto"
            alt="Contracting and expanding bicycle gears."
            placeholder="blur"
          />
        </ResponsiveCaption>

        {/* 03 Development */}
        <ResponsiveHeading numbering="03">Compact High-Powered Air Conditioners</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Other projects I worked on include a large portable battery capable of powering 110 Volt outlets for
              powering desktop computers and other large devices on-the-go, an ecologically friendly way of heating
              water for homes, and a new type of air conditioner that promised ten times more power than a traditional
              one without obstructing your entire windows.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Powerful home cooling units that don't obstruct windows.">
          <Image
            src={cht4AirConditioner}
            className="w-100 h-auto"
            alt="Powerful home cooling units that don't obstruct windows."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
