import { projects } from "@/data/projects";
import Image from "@/components/image";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "mqp");

  return {
    title: project.title,
  };
}

export default function MQP() {
  const project = projects.find((project) => project.id === "mqp");

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
              The Major Qualifying Project, or MQP, is a project at WPI in a student's area of study meant to give the
              student a real-world engineering experience. In my senior year, I chose to build an autonomous ground
              vehicle for my MQP with Professor Alexander Wyglinski.
            </p>
            <p>
              With the price of sensors and computing steadily decreasing year after year, affordable self-driving
              automobiles are starting to become a reality. This MQP aimed to imagine a divergent take on autonomous
              vehicle technology by challenging modern vision algorithms rather than pursue expensive sensors like
              LIDAR. Although sensors like LIDAR have dominated recent ventures, their price, bulk, and vulnerable
              location atop autonomous vehicles could hinder their uptake in the future. As a result, this project
              sought instead to pursue vision-based object-recognition and navigation. For this project, a 1995 electric
              golf cart was acquired for prototyping.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-golfcart.jpg"
          caption="The 1995 electric golf cart we modified to be autonomous."
          title="We kept the golf cart in the basement of WPI's recreation center."
        />

        {/* 02 Approach */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">02</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">02&ensp;</span>Approach
            </h2>
            <p>
              Significant upgrades had to be made to its design in order for it to become autonomous. Because of the
              large scale of this project, the project was broken down into separate subsystems, each of which were
              worked on separately to be combined sometime in the future. The different systems requiring modifications
              are shown below. My work on the project involved the three electromechanical subsystems outlined in
              orange&mdash;the stereoscopic cameras, the automated steering mechanism, and the automated braking
              mechanism. Each of these subsystems posed its own unique challenges and had to be dealt with differently.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-system-diagram.png"
          caption="Overview of the different subsystems of the autonomous vehicle."
          title="Block diagram of different parts of the robotic system."
        />

        {/* 03 Raspberry Pi Mount */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">03</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">03&ensp;</span>Raspberry Pi Camera Mount
            </h2>
            <p>
              Raspberry Pi cameras were used for the steroscopic cameras, since they were cheaply available and readily
              able to be connected to a wireless network through Raspberry Pi computers. A mounting solution was
              required for the Raspberry Pi cameras and computers. Creating a mount was more difficult than originally
              anticipated, since the requirements called for, for example, ensuring that the stereoscopic cameras would
              always point in exactly the same direction. The final design, after going through five iterations, is
              shown modeled in CAD below. The red plate holding the Raspberry Pi computers and cameras can be easily
              removed by pinching a spring-locked mechanism and sliding it out.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-camera-mount-cad.jpg"
          caption="The CAD model of the final design of the Raspberry Pi camera mount."
          title="The Raspberry Pi cameras were protected by a clear acrylic mount."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              The final design is shown below; tests showed that the design worked well and the cameras were held
              rigidly. The adjustable legs allowed us to try attaching the cameras to different locations on the golf
              cart.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-camera-mount.jpg"
          caption="The final Raspberry Pi camera mount attached to the golf cart frame."
          title="The camera mount attached to the hood of the golf cart."
        />

        {/* 04 Steering */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">04</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">04&ensp;</span>Automated Steering Mechanism
            </h2>
            <p>
              Next, the steering system needed to be modified to allow the computer to control it. This involved
              attaching a motor to the dashboard of the golf cart (since there was no space under the hood) using a
              chain and sprocket system. The appropriate torque and speed calculations were done, and a motor was
              acquired. A multiturn potentiometer was used for position feedback and was attached with its own sprocket.
              The potentiometer sprocket was chosen to maximize the resolution of the data coming out of the sensor.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-steering-cad.jpg"
          caption="Exploded CAD view of the steering assembly attached to the golf cart dashboard."
          title="Exploded CAD view of the steering assembly."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              Once everything was mounted, the final tests showed the speed and torque of the system had surpassed the
              requirements. Translucent acrylic plates were placed on either side of the sprockets for aesthetics, to
              protect the components and the passengers, and to decrease the chance of the chain slipping off the
              sprockets.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-steering.jpg"
          caption="The final design of the automated steering mechanism."
          title="The steering mechanism attached to the golf cart's dash."
        />

        {/* 05 Braking */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">05</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">05&ensp;</span>Automated Braking System
            </h2>
            <p>
              Finally, the brakes on the golf cart were automated to allow the computer to control them. A
              non-backdrivable van door motor was chosen for its high torque and low speed. For safety, a new mechanism
              was designed to allow the brake pedal to override the computer control. The design, shown below in CAD, is
              such that the motor pulls on the red block with a pair of steel ropes. The red block collides with a
              collar which pulls the hooked rod forward, engaging the brakes. However, the brake pedal can also pull on
              the hooked rod without fighting against the motor, making the mechanism backdrivable.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-brakes-cad.jpg"
          caption="A CAD model of the final automated braking system."
          title="A CAD model of the final automated braking system."
        />

        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
            <p>
              The system was messy and difficult to mount since the golf cart had to be propped up with a car jack, but
              the final design worked well within the given time and force requirements in testing. The final design is
              shown mounted to the bottom of the golf cart below.
            </p>
          </div>
        </div>

        <Image
          src="/img/mqp-brakes.jpg"
          caption="The final design of the automated braking system."
          title="The braking system mounted underneath the golf cart's floor."
        />

        {/* Final Report */}
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <hr />
            <h3>Final Report</h3>
            <a
              target="_blank"
              href="http://www.wpi.edu/Pubs/E-project/Available/E-project-043015-034638/unrestricted/Final_Report.pdf"
            >
              Find a copy of my 82-page final report here.
            </a>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
