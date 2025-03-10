import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "sw");

  return {
    title: project.title,
  };
}

export default function SW() {
  const project = projects.find((project) => project.id === "sw");

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
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">02</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">02&ensp;</span>Design
            </h2>
            <p>
              We began by tossing out the conventional four-walls design of cubicles and designed a hexagonal skeletonal
              structure with a chair that hung from a motorized gantry above. I modeled the PCs, monitors, and drawing
              board for the model so we could model and plan out how everything would fit.
            </p>
          </div>
        </div>

        <Image
          src="/img/sw-office-cad.jpg"
          caption="We modeled the entire design in SolidWorks first."
          title="A CAD concept drawing of the Ultimate Office."
        />

        {/* 03 Development */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">03</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">03&ensp;</span>Development
            </h2>
            <p>
              Once we finalized the CAD model, we began construction of the actual Ultimate Office. I helped build the
              indoor waterfall from scratch, since we couldn't find anything online of the right size, shape, and color
              that we needed. We laid the inside with silicone to waterproof the structure and spray-painted it black.
            </p>
          </div>
        </div>

        <Image
          src="/img/sw-waterfall.jpg"
          caption="Constructing the indoor waterfall by hand."
          title="One of my co-workers assembling the waterfall before it was painted."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              Finally, as we completed parts of the Ultimate Office, everything started coming together. The film crew
              made a spectacular revealing of the final design and we really enjoyed ourselves. Our Ultimate Office was
              showcased later that year at SolidWorks World to thousands of people. I returned the following summer and
              helped out when I could with building The Ultimate Baby Stroller as well because I loved the work and the
              team so much.
            </p>
          </div>
        </div>

        <Image
          src="/img/sw-office.jpg"
          caption="Jeremy sitting in the floating chair in the finished prototype."
          title="Jeremy sitting in the floating chair in the finished prototype."
        />

        <Video title="Final Product" src="//www.youtube.com/embed/fF7fWStr1kU?list=UU_DaIEkQn_ntL3pmwnUey5A" />
      </div>
    </>
  );
}
