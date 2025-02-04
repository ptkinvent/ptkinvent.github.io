import { projects } from "@/data/projects";
import Image from "@/components/image";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "abb");

  return {
    title: project.title,
  };
}

export default function ABB() {
  const project = projects.find((project) => project.id === "abb");

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
              ABB is a manufacturer of industrial robots, those used in factories for assembling, welding, painting, and
              cutting parts on assembly lines, such as those used for making cars. The distribution center in Bangalore
              designs customer-specific grippers for these robots and travels to install these robots on-site.
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
              My project involved programming a robot to apply stickers to the outside surface of barrel-shaped objects
              for a customer. I began by working with a team to design a gripper in CAD which would be able to control a
              sticker roller.
            </p>
            <p>
              Once this was complete, I used inverse kinematics and some C programming to help generate the path I
              needed the robot to follow, then simply programmed the robot using the robot's controller, which used a
              fill-in-the-blank style of programming, to make the robot follow the desired trajectories. After some
              troubleshooting, I went with the team and personally helped to install and later troubleshoot the robot at
              the customer's site.
            </p>
          </div>
        </div>

        <Image
          src="/img/abb-weld.jpg"
          caption="Programming a welding robot."
          title="A welding robot at ABB Inc. in Bangalore, India"
        />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              Later on, I also worked with a welding robot, a parallel manipulator for sorting chocolates into boxes,
              and a robot arm with a vision system for checking workpieces for manufacturing defects.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
