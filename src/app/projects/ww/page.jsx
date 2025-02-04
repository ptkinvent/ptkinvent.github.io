import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "ww");

  return {
    title: project.title,
  };
}

export default function WW() {
  const project = projects.find((project) => project.id === "ww");

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
              RBE 2002 is a class at Worcester Polytechnic Institute called Robotics: Sensing. The goal of the class is
              to teach students about sensors and feedback control loops. As part of the final project for the class,
              students must create a window washing robot using tools learned in class and from the robotics lab at WPI.
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
              I built this robot was with two other robotics engineers at WPI, Ayesha Fathima and Wut Yee Oo, for a
              class called RBE 2002. The challenge for the class was to build a robot to clean windows on high-rise
              buildings while applying a constant pressure against the window surface as it moved about.
            </p>
            <p>
              We opted for a novel design, scrapping the linear, back-and-forth motions everyone else used, and instead
              integrating a rotating planetary gear set on the front of the robot. Since the moving parts on our robot
              moved with constant rotational velocity, there was no overall torque applied on the robot so there was
              very little shakiness as the robot washed. Because of how elegantly and uniquely it completed the
              challenge, we had the honor of the WPI robotics lab preserving our robot in a glass case at the end of the
              year.
            </p>
          </div>
        </div>

        <Image
          src="/img/ww-xsection-cad.jpg"
          caption="Cross-sectional view of the robot's internal components."
          title="Cross-sectional view of the robot's internal components."
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
              The robot is constructed of laser-cut acrylic pieces Wut Yee and I designed in SolidWorks and held
              together with bolts. The sensors and gears used are part of the Vex consctruction set and include two
              limit switches, a pushbutton, a linear potentiometer, and an encoder. The software PID controller was
              programmed into an Arduino microcontroller by all three of us.
            </p>
          </div>
        </div>

        <Image
          src="/img/ww-prototype.jpg"
          caption="First physical prototype built of laser-cut acrylic."
          title="The initial prototype with acrylic and Vex pieces without any electronics."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              The following year, we were delighted to find that our design had inspired a new generation of window
              washing robots which used planetary gears for enhanced washing.
            </p>
          </div>
        </div>

        <Image
          src="/img/ww-prototype-cad.jpg"
          caption="CAD model of our final design."
          title="A SolidWorks mockup of the final design."
        />

        <Video
          title="Final Product"
          src="//player.vimeo.com/video/109870401?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
