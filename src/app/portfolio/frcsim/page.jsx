import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Video from "@/components/video";
import Image from "next/image";
import frcsimSharp from "@/assets/img/frcsim-sharp.jpg";
import frcsimGif from "@/assets/img/frcsim.gif";
import frcsimLidarGif from "@/assets/img/frcsim-lidar.gif";

import { Button } from "@/components/ui/button";

// lucide-react dropped brand/logo icons, so the GitHub mark is inlined here.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "frcsim");

  return {
    title: project.title,
  };
}

export default function FrcSim() {
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
      <p>
        FIRST is an international organization that operates robotics competitions for grade-school students. Their
        most popular is the FIRST Robotics Competition (FRC), which takes place every January. Thousands of students
        spend 10 weeks with their teams building a 125-lb robot to play a 3 vs. 3 game that changes every year. The
        students are encouraged to use 3D printing, metalworking techniques, CAD, and Java programming to design and
        build their robots.
      </p>
      <p>
        Although I'd been on a robotics team in high school, we competed in the smaller FIRST Tech Challenge (FTC)
        competition. When I moved to Pittsburgh recently, I wanted to pass on the robotics knowledge I had gained and
        sought out a local FRC team: Sarah Heinz Advanced Robotics Program (Team SHARP) based out of the Sarah Heinz
        House located in the North Side of Pittsburgh.
      </p>

      <ResponsiveCaption caption="Team SHARP 3260 in Pittsburgh, PA">
        <Image src={frcsimSharp} className="h-auto w-full" alt="FRC Team SHARP 3260" placeholder="blur" />
      </ResponsiveCaption>

      <p>
        I spent time understanding the programming team's key challenges and quickly learned that their biggest pain
        point every year was lack of time with the robot because the hardware design took 90% of the available build
        time. This had led to flaky software in the past and no time to tackle more complex logic.
      </p>
      <p>
        Leveraging my industry experience, I explained to the team that we could build a simulation of the robot to
        experiment until the real robot was finished. We set to work and ultimately built something resembling a
        videogame that helped springboard the programming team in the 2020 season.{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/SarahHeinzHouseFRC/frcsim2020">
          Check out the results on our GitHub
        </a>
        .
      </p>

      <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
      <p>
        The system works as three separate modules communicating over fast UDP using JSON. The first mimics an Xbox
        controller (so the students wouldn't always be forced to share a real one), the second runs their custom Java
        code, and the third runs the physics simulation of the robot and field. For the physics simulation, I chose
        to use OpenSceneGraph for lightweight 3D visualization and Box2D for the physics.
      </p>

      <ResponsiveCaption caption="A simulated robot being teleoperated around a virtual field.">
        <Image
          src={frcsimGif}
          className="h-auto w-full"
          alt="A simulated robot drives around the field using a virtual Xbox controller"
        />
      </ResponsiveCaption>

      <ResponsiveHeading numbering="03">Results</ResponsiveHeading>
      <p>
        Just a couple short weeks later, the simulator solved an unforseen problem: the pandemic hit, and
        unfortunately all the FRC competitions were canceled for the year. The students still yearned to continue
        working on the robot, but couldn't meet at the lab, so I launched an online weekly lab meeting to continue
        working on the robot using the simulator through the summer!
      </p>

      <ResponsiveCaption caption="The simulated LIDAR in the sim allowed us to make a 100% autonomous robot.">
        <Image src={frcsimLidarGif} className="h-auto w-full" alt="Beams of laser light spinning around the robot." />
      </ResponsiveCaption>

      <p>
        To teach the team about autonomous operations, I added a simulated LIDAR to the physics simulation. Over 10
        weeks through the summer, we co-programmed a highly sophisticated AI that could distinguish robots from balls
        on the field, collect and score balls, and navigate the field on its own without any human intervention. We
        shared our results with the rest of the community to some amazing feedback. The students are continuing to
        use the code and are planning to purchase a $100 LIDAR with the same specs as the simulated one to attempt to
        augment their gameplay in 2021.
      </p>

      <div className="not-prose flex flex-col gap-2">
        <Button asChild variant="destructive" size="lg">
          <a href="https://github.com/SarahHeinzHouseFRC/frcsim2020" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-4" />
            FRC Simulator on GitHub
          </a>
        </Button>
        <Button asChild size="lg">
          <a
            href="https://github.com/SarahHeinzHouseFRC/automated_infinite_recharge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-4" />
            Autonomous FRC Robot on GitHub
          </a>
        </Button>
      </div>

      <Video
        title="Final Result"
        src="https://player.vimeo.com/video/478627848?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
      />
    </article>
  );
}
