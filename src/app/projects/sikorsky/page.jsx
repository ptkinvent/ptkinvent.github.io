import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "sikorsky");

  return {
    title: project.title,
  };
}

export default function Sikorsky() {
  const project = projects.find((project) => project.id === "sikorsky");

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
              In 1939, the world's first practical helicopter took flight in Stratford, Connecticut. It was piloted by
              Igor Sikorsky, a prolific inventor and the founder of Sikorsky Aircraft. After a long and distinguished
              legacy of building the universally-recognized Black Hawk and several presidential aircraft, Sikorsky
              Aircraft ventured into autonomous aviation in 2011. A small team with the backing of the leadership
              acquired an S-76 commercial helicopter and outfitted it with fly-by-wire and advanced flight controls. A
              robust safety-critical software fallback system gained the aircraft FAA approval to run experimental
              software, forming the foundation for the Autonomy team.
            </p>
            <p>
              Rapid gains and proofs-of-concept in Sikorsky's venture led DARPA to launch the DARPA ALIAS (Aircrew Labor
              In-cockpit Automation System) challenge with Sikorsky, Aurora Flight Sciences, and Lockheed Martin as
              competitors (Sikorsky had not yet been acquired by Lockheed Martin). After three rounds, Sikorsky emerged
              as the winner with a smart copilot and automation kit for fixed-wings and rotorcraft. One of the major
              reasons our system was so successful was because it was geared for certification and commercialization,
              not for prototyping and research. The core software was written to obey hard real-time constraints, and
              the supporting software modules were written with safety-criticality and certification in mind.
            </p>
          </div>
        </div>

        <Image
          src="/img/sikorsky-cessna.png"
          caption="Our aircraft-agnostic autonomy kit was demonstrated on a fixed-wing aircraft."
          title="A Cessna 208 and SARA flying over New York."
        />

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
              The test aircraft, called SARA (Sikorsky Autonomous Research Aircraft), was outfitted with three LIDAR
              sensors and a multitude of cameras. The main LIDAR had a range of 1 kilometer and was used for collision
              avoidance and landing zone detection. The software was designed to be as aircraft-agnostic as possible,
              and consisted of sophisticated motion planners and perception systems.
            </p>
            <p>
              One of the challenges posed by the ALIAS program was to not only make the aircraft autonomous, but
              optionally piloted&mdash;meaning, firstly, that the system needed to behave in-line with the expectations
              of a human pilot, and, secondly, that the system needed to allow some kind of human input as suggestions
              to the motion planning. The team was able to deftly overcome this challenge and the result proved for a
              successful{" "}
              <a target="_blank" href="https://www.youtube.com/watch?v=J06OmgIOdJ4">
                demonstration of the Matrix technology to the U.S. Army in October 2018
              </a>
              .
            </p>
            <p>
              My work at Sikorsky consisted mainly of algorithm development in perception and motion planning; I
              researched and implemented novel data structures and algorithms for our application, including AABB trees,
              octrees, and signed distance fields. I also worked on LIDAR simulation and calibration.
            </p>
          </div>
        </div>

        <Image
          src="/img/sikorsky-black-hawk.png"
          caption="The Matrix technology was recently demonstrated on a Black Hawk."
          title="A Black Hawk and SARA taking off from a runway."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              The road ahead for Sikorsky is bright. The team recently got FAA approval to let non-pilots fly the
              aircraft from inside the cockpit (see{" "}
              <a
                target="_blank"
                href="https://www.theverge.com/transportation/2019/3/5/18250996/sikorsky-autonomous-helicopter-flying-taxi-lockheed"
              >
                here
              </a>
              ), and the kit has already been demonstrated to work well on several different kinds of aircraft. The kit
              was also ported to a UH-60 Black Hawk with tighter integrations into its systems to allow even more
              sophisticated autonomy.
            </p>
          </div>
        </div>

        <Video title="Demonstration" src="https://www.youtube.com/embed/J06OmgIOdJ4" />
      </div>
    </>
  );
}
