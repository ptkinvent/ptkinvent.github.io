import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Video from "@/components/video";
import Image from "next/image";
import wwXsectionCad from "@/assets/img/ww-xsection-cad.jpg";
import wwPrototype from "@/assets/img/ww-prototype.jpg";
import wwPrototypeCad from "@/assets/img/ww-prototype-cad.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "ww");

  return {
    title: project.title,
  };
}

export default function WW() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              RBE 2002 is a class at Worcester Polytechnic Institute called Robotics: Sensing. The goal of the class is
              to teach students about sensors and feedback control loops. As part of the final project for the class,
              students must create a window washing robot using tools learned in class and from the robotics lab at WPI.
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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

        <ResponsiveCaption caption="Cross-sectional view of the robot's internal components.">
          <Image
            src={wwXsectionCad}
            className="w-100 h-auto"
            alt="Cross-sectional view of the robot's internal components."
            placeholder="blur"
          />
        </ResponsiveCaption>

        {/* 03 Development */}
        <ResponsiveHeading numbering="03">Development</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              The robot is constructed of laser-cut acrylic pieces Wut Yee and I designed in SolidWorks and held
              together with bolts. The sensors and gears used are part of the Vex consctruction set and include two
              limit switches, a pushbutton, a linear potentiometer, and an encoder. The software PID controller was
              programmed into an Arduino microcontroller by all three of us.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="First physical prototype built of laser-cut acrylic.">
          <Image
            src={wwPrototype}
            className="w-100 h-auto"
            alt="The initial prototype with acrylic and Vex pieces without any electronics."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              The following year, we were delighted to find that our design had inspired a new generation of window
              washing robots which used planetary gears for enhanced washing.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="CAD model of our final design.">
          <Image
            src={wwPrototypeCad}
            className="w-100 h-auto"
            alt="A SolidWorks mockup of the final design."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <Video
          title="Final Product"
          src="//player.vimeo.com/video/109870401?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
