import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "frcsim");

  return {
    title: project.title,
  };
}

export default function FRCSim() {
  const project = projects.find((project) => project.id === "frcsim");

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

        <Image src="/img/frcsim-sharp.jpg" caption="Team SHARP 3260 in Pittsburgh, PA" title="FRC Team SHARP 3260" />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              I took a keen interest in understanding the programming team's major challenges and quickly learned that
              their biggest hurdle every year was lack of time with the robot because the hardware design took a lot of
              time. This had led to flaky software in the past and no time to tackle more complex logic.
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
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">02</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">02&ensp;</span>Design
            </h2>
            <p>
              The system works as three separate modules communicating over fast UDP using JSON. The first mimics an
              Xbox controller (so the students wouldn't always be forced to share a real one), the second runs their
              custom Java code, and the third runs the physics simulation of the robot and field. For the physics
              simulation, I chose to use OpenSceneGraph for lightweight 3D visualization and Box2D for the physics.
            </p>
          </div>
        </div>

        <Image
          src="/img/frcsim.gif"
          caption="A simulated robot being teleoperated around a virtual field."
          title="A simulated robot drives around the field using a virtual Xbox controller"
        />

        {/* 03 Results */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">03</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">03&ensp;</span>Results
            </h2>
            <p>
              Just a few weeks later, the simulator solved an unforseen problem: after the pandemic hit, unfortunately
              all the FRC competitions were canceled for the year and Team SHARP didn't get to compete at all. The
              students still yearned to meet and continue working on the robot, especially over the summer, but could
              not use the lab&mdash;so I launched an online lab using the simulator!
            </p>
          </div>
        </div>

        <Image
          src="/img/frcsim-lidar.gif"
          caption="The simulated LIDAR in the sim allowed us to make a 100% autonomous robot."
          title="Beams of laser light spinning around the robot."
        />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              To teach the students about autonomous robotics, I added a simulated LIDAR to the physics simulation. Over
              10 short weeks over the summer, we built a highly sophisticated AI that could distinguish robots from
              balls on the field, collect and score balls, and avoid hitting other robots without any human
              intervention. We shared our results with the rest of the community to some amazing feedback. The students
              are continuing to use the code and are planning to purchase a $100 LIDAR with the same specs as the
              simulated one to attempt to automate their gameplay in 2021.
            </p>

            <div className="text-center mt-4">
              <a
                href="https://github.com/SarahHeinzHouseFRC/frcsim2020"
                target="_blank"
                className="btn btn-primary btn-block btn-lg"
              >
                FRC Simulator on GitHub
              </a>
              <a
                href="https://github.com/SarahHeinzHouseFRC/automated_infinite_recharge"
                target="_blank"
                className="btn btn-danger btn-block btn-lg"
              >
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
