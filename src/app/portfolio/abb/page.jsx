import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import abbWeld from "@/assets/img/abb-weld.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "abb");

  return {
    title: project.title,
  };
}

export default function ABB() {
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
      <p>
        ABB is a manufacturer of industrial robots, those used in factories for assembling, welding, painting, and
        cutting parts on assembly lines, such as those used for making cars. The distribution center in Bangalore
        designs customer-specific grippers for these robots and travels to install these robots on-site.
      </p>

      <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
      <p>
        My project involved programming a robot to apply stickers to the outside surface of barrel-shaped objects for
        a customer. I began by working with a team to design a gripper in CAD which would be able to control a
        sticker roller.
      </p>
      <p>
        Once this was complete, I used inverse kinematics and some C programming to help generate the path I needed
        the robot to follow, then simply programmed the robot using the robot's controller, which used a
        fill-in-the-blank style of programming, to make the robot follow the desired trajectories. After some
        troubleshooting, I went with the team and personally helped to install and later troubleshoot the robot at
        the customer's site.
      </p>

      <ResponsiveCaption caption="Programming a welding robot.">
        <Image src={abbWeld} className="h-auto w-full" alt="A welding robot at ABB Inc. in Bangalore, India" placeholder="blur" />
      </ResponsiveCaption>

      <p>
        Later on, I also worked with a welding robot, a parallel manipulator for sorting chocolates into boxes, and a
        robot arm with a vision system for checking workpieces for manufacturing defects.
      </p>
    </article>
  );
}
