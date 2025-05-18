import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import Video from "@/components/video";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import assemblyIsometric from "@/assets/img/assembly-isometric.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "assembly");

  return {
    title: project.title,
  };
}

export default function Assembly() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              I built this robot with Peerapat Luxsuwong, Meagan Hiatt, and Adria Fung as part of a final project at WPI
              for a class called RBE 3001: Unified Robotics III. The project was to make a robot to pick weights off an
              assembly line and sort them by weight. The skills we implemented involved programming a serial manipulator
              from the microcontroller up using embedded programming, inverse kinematics, and PID control.
            </p>
          </div>
        </div>

        {/* 02 Design */}
        <ResponsiveHeading numbering="02">Design</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              We were given an electronics board with the microcontroller and several aspects included as well as the
              arm and conveyor belt. We attached an infrared sensor and used it to detect the distance between the arm
              and an incoming object on the belt. Using inverse kinematics, our arm could grab an incoming block about
              95% of the time. The robot then extended itself out horizontally and obtained the weight of the block it
              was holding by sensing the current through the lower motor. Since the current is proportional to the
              torque in the motor, the robot could determine if the block was heavy or light and sort it accordingly.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="The electronics board, robot arm, and conveyor system.">
          <Image
            src={assemblyIsometric}
            className="w-100 h-auto"
            alt="The electronics board, robot arm, and conveyor system."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Several other components came into play during the project, including the timers, ADC, DAC, linear motor
              drivers, current sensors, USART and SPI communications.
            </p>
          </div>
        </div>

        <Video
          title="Final Product"
          src="//player.vimeo.com/video/109782134?title=0&amp;byline=0&amp;portrait=0&amp;color=d86e3e"
        />
      </div>
    </>
  );
}
