import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "musicbot");

  return {
    title: project.title,
  };
}

export default function Musicbot() {
  const project = projects.find((project) => project.id === "musicbot");

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
              Over the last summer, I worked at the The Personal Robotics Group, which is a lab at MIT's Media Lab in
              Cambridge, MA that conducts research in social robotics. Social robots are those that are capable of
              perceiving, relating, and mimicking human emotions. The group is headed by Professor Cynthia Breazeal.
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
              I built this musical robot for David Nu&ntilde;ez &mdash; it will be used for researching the efficacy of
              music for forming relationships with robots. I put a lot of work into designing the robot's form around
              its function, an important component of human-robot interactions, as I learned. Many of the contours are
              inspired by those of old phonographs.
            </p>
            <p>
              I began by sketching a few forms out on paper with David, then went through a few iterations in SolidWorks
              until the design was mechanically plausible and had an aesthetically pleasing yet functional form.
            </p>
          </div>
        </div>

        <Image
          src="/img/musicbot-concept.jpg"
          caption="Initial designs in SolidWorks."
          title="A CAD drawing of the musical robot in its early stages."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              The parts were laser-cut and waterjet from stock sheets of acrylic and oak wood. The phonograph-like horn
              was 3D-printed and spray-painted with multiple coats.
            </p>
            <p>
              After constructing the first prototype, I made many modifications to the design before building a second
              prototype with smoother joints and better motion overall.
            </p>
          </div>
        </div>

        <Image
          src="/img/musicbot-construction.jpg"
          caption="Constructing the first prototype."
          title="Various water-jet and 3D-printed components being assembled by hand."
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
              The final design features six degrees of freedom, which will allow the robot to move fluidly, a must in
              social robotics. Two of the motors are high-torque in order to manage the weight of the head of the robot;
              two more servos in the head are very small and lightweight in order to reduce the weight; and the last two
              servos are medium-sized to handle proper rotation of the body and the rolling of the head. This second
              design is more robust and puts less strain on the joints. David Nu&ntilde;ez will be taking the robot to
              the Opera of the Future group at the MIT Media Lab to perform experiments with.
            </p>
          </div>
        </div>

        <Video
          title="Final Product"
          src="//player.vimeo.com/video/109550431?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
