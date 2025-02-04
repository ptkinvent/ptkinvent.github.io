import { projects } from "@/data/projects";
import Image from "@/components/image";
import Video from "@/components/video";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "assembly");

  return {
    title: project.title,
  };
}

export default function Assembly() {
  const project = projects.find((project) => project.id === "assembly");

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
              I built this robot with Peerapat Luxsuwong, Meagan Hiatt, and Adria Fung as part of a final project at WPI
              for a class called RBE 3001: Unified Robotics III. The project was to make a robot to pick weights off an
              assembly line and sort them by weight. The skills we implemented involved programming a serial manipulator
              from the microcontroller up using embedded programming, inverse kinematics, and PID control.
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
              We were given an electronics board with the microcontroller and several aspects included as well as the
              arm and conveyor belt. We attached an infrared sensor and used it to detect the distance between the arm
              and an incoming object on the belt. Using inverse kinematics, our arm could grab an incoming block about
              95% of the time. The robot then extended itself out horizontally and obtained the weight of the block it
              was holding by sensing the current through the lower motor. Since the current is proportional to the
              torque in the motor, the robot could determine if the block was heavy or light and sort it accordingly.
            </p>
          </div>
        </div>

        <Image
          src="/img/assembly-isometric.jpg"
          caption="The electronics board, robot arm, and conveyor system."
          title="The electronics board, robot arm, and conveyor system."
        />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
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
