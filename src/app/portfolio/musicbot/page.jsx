import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Video from "@/components/video";
import Image from "next/image";
import musicbotConcept from "@/assets/img/musicbot-concept.jpg";
import musicbotConstruction from "@/assets/img/musicbot-construction.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "musicbot");

  return {
    title: project.title,
  };
}

export default function Musicbot() {
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
      <p>
        Over the last summer, I worked at the The Personal Robotics Group, which is a lab at MIT's Media Lab in
        Cambridge, MA that conducts research in social robotics. Social robots are those that are capable of
        perceiving, relating, and mimicking human emotions. The group is headed by Professor Cynthia Breazeal.
      </p>

      <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
      <p>
        I built this musical robot for David Nu&ntilde;ez &mdash; it will be used for researching the efficacy of
        music for forming relationships with robots. I put a lot of work into designing the robot's form around its
        function, an important component of human-robot interactions, as I learned. Many of the contours are
        inspired by those of old phonographs.
      </p>
      <p>
        I began by sketching a few forms out on paper with David, then went through a few iterations in SolidWorks
        until the design was mechanically plausible and had an aesthetically pleasing yet functional form.
      </p>

      <ResponsiveCaption caption="Initial designs in SolidWorks.">
        <Image
          src={musicbotConcept}
          className="h-auto w-full"
          alt="A CAD drawing of the musical robot in its early stages."
          placeholder="blur"
        />
      </ResponsiveCaption>

      <p>
        The parts were laser-cut and waterjet from stock sheets of acrylic and oak wood. The phonograph-like horn was
        3D-printed and spray-painted with multiple coats.
      </p>
      <p>
        After constructing the first prototype, I made many modifications to the design before building a second
        prototype with smoother joints and better motion overall.
      </p>

      <ResponsiveCaption caption="Constructing the first prototype.">
        <Image
          src={musicbotConstruction}
          className="h-auto w-full"
          alt="Various water-jet and 3D-printed components being assembled by hand."
          placeholder="blur"
        />
      </ResponsiveCaption>

      <ResponsiveHeading numbering="03">Development</ResponsiveHeading>
      <p>
        The final design features six degrees of freedom, which will allow the robot to move fluidly, a must in
        social robotics. Two of the motors are high-torque in order to manage the weight of the head of the robot;
        two more servos in the head are very small and lightweight in order to reduce the weight; and the last two
        servos are medium-sized to handle proper rotation of the body and the rolling of the head. This second design
        is more robust and puts less strain on the joints. David Nu&ntilde;ez will be taking the robot to the Opera
        of the Future group at the MIT Media Lab to perform experiments with.
      </p>

      <Video
        title="Final Product"
        src="//player.vimeo.com/video/109550431?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
      />
    </article>
  );
}
