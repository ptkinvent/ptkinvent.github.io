import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import Video from "@/components/video";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import artField from "@/assets/img/art-field.jpg";
import artLibrary from "@/assets/img/art-library.jpg";
import artYearTwo from "@/assets/img/art-year-two.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "art");

  return {
    title: project.title,
  };
}

export default function ART() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              In 2010, my friend Naman Bharadwaj and I founded the Acton Robotics Team to foster our interests in
              robotics in high school. Together, he and I created a team to compete in the{" "}
              <a href="https://www.firstinspires.org/robotics/ftc" target="_blank">
                FIRST Tech Challenge (FTC)
              </a>{" "}
              national robotics competition. The competition consists of a different challenge each year involving
              balls, hoops, tubes, or the like, played by remotely controlled robots on a 12' &times; 12' field in teams
              of two against two. There are many different regional competitions around the country, the top teams of
              which advance to the state and national levels. In our first year, our team placed in the top ten in the
              Massachusetts, Connecticut, and New Hampshire regional competition and won the top design award our second
              year. Our Acton Robotics Team, or Team 3938, still competes today and is a highly respected team of
              robotics engineers.
            </p>
          </div>
        </div>

        {/* 02 First Year */}
        <ResponsiveHeading numbering="02">Our First Year</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              The challenge in our first year involved shooting whiffle balls into elevated baskets. Because we were
              starting from scratch, we began by securing sponsorships and fundraising by selling small toy robots
              called Hexbugs. We were also very fortunate to be funded by iRobot and Raytheon. By Christmastime, we were
              able to purchase the kit and get started building our robot.
            </p>
            <p>
              We used a combination of Tetrix, which is a construction system of aluminum channels and bolts, and Lego
              to build our robot. We used an innovative technique to align our robot with the goal using infrared
              sensors and ended up placing 9th out of the 30 teams who participated in the Pathfinder Regional
              Competition.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Our robot at the Pathfinder Regional Competition.">
          <Image
            src={artField}
            className="w-100 h-auto"
            alt="Our robot at the regional championship in 2010"
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              After the competition, we took initiative in our hometown and performed demonstrations for young children
              at our local Science Discovery Museum and town library to promote robotics.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="A demonstration of our robot at the Acton Memorial Library.">
          <Image
            src={artLibrary}
            className="w-100 h-auto"
            alt="Presenting the robot to children at the Acton library"
            placeholder="blur"
          />
        </ResponsiveCaption>

        {/* 03 Second Year */}
        <ResponsiveHeading numbering="03">Our Second Year</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              The following year, we entered the regional competition again with a different robot. That year, the
              challenge involved picking up tubes and placing them into moving containers. Once again we employed an
              innovative design, and actually ended up winning a PTC Design Award.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="A SolidWorks model of our award-winning robot for the second year.">
          <Image
            src={artYearTwo}
            className="w-100 h-auto"
            alt="A CAD model of the robot we built for the 2011 regional championship"
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              We had a chance to present our robot to Raytheon, and impressed their design team with our novel approach
              to the problems faced in the challenge.
            </p>
          </div>
        </div>

        <Video
          title="Final Design &mdash; Year One"
          src="//player.vimeo.com/video/109889681?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
