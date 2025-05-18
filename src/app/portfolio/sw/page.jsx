import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Video from "@/components/video";
import Image from "next/image";
import swOfficeCad from "@/assets/img/sw-office-cad.jpg";
import swWaterfall from "@/assets/img/sw-waterfall.jpg";
import swOffice from "@/assets/img/sw-office.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "sw");

  return {
    title: project.title,
  };
}

export default function SW() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              SolidWorks Corporation is a company belonging to Dassault Systemes which produces 3D-modeling software for
              engineers, called computer-aided design (CAD) software. Having taught myself the software in high school,
              I had everything I needed to become their first high school intern ever.
            </p>
            <p>
              I worked with a group of engineers on a marketing project called Let's Go Design. We were given a sizeable
              budget by the company to design and prototype the most exciting concepts we could think of and to record a
              web video series around it to advertise SolidWorks to budding engineers. I worked with Jeremy Luchini, the
              lead and face of Let's Go Design, among many others, to design and build what we called The Ultimate
              Office &mdash; our vision of the next-generation office cubicle.
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              We began by tossing out the conventional four-walls design of cubicles and designed a hexagonal skeletonal
              structure with a chair that hung from a motorized gantry above. I modeled the PCs, monitors, and drawing
              board for the model so we could model and plan out how everything would fit.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="We modeled the entire design in SolidWorks first.">
          <Image
            src={swOfficeCad}
            className="w-100 h-auto"
            alt="A CAD concept drawing of the Ultimate Office."
            placeholder="blur"
          />
        </ResponsiveCaption>

        {/* 03 Development */}
        <ResponsiveHeading numbering="03">Development</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Once we finalized the CAD model, we began construction of the actual Ultimate Office. I helped build the
              indoor waterfall from scratch, since we couldn't find anything online of the right size, shape, and color
              that we needed. We laid the inside with silicone to waterproof the structure and spray-painted it black.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Constructing the indoor waterfall by hand.">
          <Image
            src={swWaterfall}
            className="w-100 h-auto"
            alt="One of my co-workers assembling the waterfall before it was painted."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Finally, as we completed parts of the Ultimate Office, everything started coming together. The film crew
              made a spectacular revealing of the final design and we really enjoyed ourselves. Our Ultimate Office was
              showcased later that year at SolidWorks World to thousands of people. I returned the following summer and
              helped out when I could with building The Ultimate Baby Stroller as well because I loved the work and the
              team so much.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Jeremy sitting in the floating chair in the finished prototype.">
          <Image
            src={swOffice}
            className="w-100 h-auto"
            alt="Jeremy sitting in the floating chair in the finished prototype."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <Video title="Final Product" src="//www.youtube.com/embed/fF7fWStr1kU?list=UU_DaIEkQn_ntL3pmwnUey5A" />
      </div>
    </>
  );
}
