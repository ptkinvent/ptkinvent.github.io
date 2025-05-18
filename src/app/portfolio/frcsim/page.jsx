import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Video from "@/components/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import frcsimSharp from "@/assets/img/frcsim-sharp.jpg";
import frcsimGif from "@/assets/img/frcsim.gif";
import frcsimLidarGif from "@/assets/img/frcsim-lidar.gif";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "frcsim");

  return {
    title: project.title,
  };
}

export default function FrcSim() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              FIRST is an international organization that operates robotics competitions for grade-school students.
              Their most popular is the FIRST Robotics Competition (FRC), which takes place every January. Thousands of
              students spend 10 weeks with their teams building a 125-lb robot to play a 3 vs. 3 game that changes every
              year. The students are encouraged to use 3D printing, metalworking techniques, CAD, and Java programming
              to design and build their robots.
            </p>
            <p>
              Although I'd been on a robotics team in high school, we competed in the smaller FIRST Tech Challenge (FTC)
              competition. When I moved to Pittsburgh recently, I wanted to pass on the robotics knowledge I had gained
              and sought out a local FRC team: Sarah Heinz Advanced Robotics Program (Team SHARP) based out of the Sarah
              Heinz House located in the North Side of Pittsburgh.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Team SHARP 3260 in Pittsburgh, PA">
          <Image src={frcsimSharp} className="w-100 h-auto" alt="FRC Team SHARP 3260" placeholder="blur" />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              I spent time understanding the programming team's key challenges and quickly learned that their biggest
              pain point every year was lack of time with the robot because the hardware design took 90% of the
              available build time. This had led to flaky software in the past and no time to tackle more complex logic.
            </p>
            <p>
              Leveraging my industry experience, I explained to the team that we could build a simulation of the robot
              to experiment until the real robot was finished. We set to work and ultimately built something resembling
              a videogame that helped springboard the programming team in the 2020 season.{" "}
              <a target="_blank" href="https://github.com/SarahHeinzHouseFRC/frcsim2020">
                Check out the results on our GitHub
              </a>
              .
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              The system works as three separate modules communicating over fast UDP using JSON. The first mimics an
              Xbox controller (so the students wouldn't always be forced to share a real one), the second runs their
              custom Java code, and the third runs the physics simulation of the robot and field. For the physics
              simulation, I chose to use OpenSceneGraph for lightweight 3D visualization and Box2D for the physics.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="A simulated robot being teleoperated around a virtual field.">
          <Image
            src={frcsimGif}
            className="w-100 h-auto"
            alt="A simulated robot drives around the field using a virtual Xbox controller"
          />
        </ResponsiveCaption>

        {/* 03 Results */}
        <ResponsiveHeading numbering="03">Results</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Just a couple short weeks later, the simulator solved an unforseen problem: the pandemic hit, and
              unfortunately all the FRC competitions were canceled for the year. The students still yearned to continue
              working on the robot, but couldn't meet at the lab, so I launched an online weekly lab meeting to continue
              working on the robot using the simulator through the summer!
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="The simulated LIDAR in the sim allowed us to make a 100% autonomous robot.">
          <Image src={frcsimLidarGif} className="w-100 h-auto" alt="Beams of laser light spinning around the robot." />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              To teach the team about autonomous operations, I added a simulated LIDAR to the physics simulation. Over
              10 weeks through the summer, we co-programmed a highly sophisticated AI that could distinguish robots from
              balls on the field, collect and score balls, and navigate the field on its own without any human
              intervention. We shared our results with the rest of the community to some amazing feedback. The students
              are continuing to use the code and are planning to purchase a $100 LIDAR with the same specs as the
              simulated one to attempt to augment their gameplay in 2021.
            </p>

            <div className="d-flex flex-column gap-2 mt-4">
              <a
                href="https://github.com/SarahHeinzHouseFRC/frcsim2020"
                target="_blank"
                className="btn btn-danger btn-lg"
              >
                <FontAwesomeIcon icon={faGithub} className="me-2" />
                FRC Simulator on GitHub
              </a>
              <a
                href="https://github.com/SarahHeinzHouseFRC/automated_infinite_recharge"
                target="_blank"
                className="btn btn-primary btn-lg"
              >
                <FontAwesomeIcon icon={faGithub} className="me-2" />
                Autonomous FRC Robot on GitHub
              </a>
            </div>
          </div>
        </div>

        <Video
          title="Final Result"
          src="https://player.vimeo.com/video/478627848?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
