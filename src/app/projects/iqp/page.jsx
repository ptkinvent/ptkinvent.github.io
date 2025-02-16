import { projects } from "@/data/projects";
import Image from "@/components/image";

export async function generateMetadata() {
  const project = projects.find((project) => project.id === "iqp");

  return {
    title: project.title,
  };
}

export default function IQP() {
  const project = projects.find((project) => project.id === "iqp");

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
              The Interactive Qualifying Project, or IQP, is a project at WPI that exposes students to communities at
              large in different social contexts. Its purpose is to enrich the students as they aid a social need.
            </p>
            <p>
              In my junior year of college, I performed my IQP with Professor Wilkes and two other students, Taryn Roy
              and Sean Smith, working on enhancing sixth grade science education at Elm Park Elementary School in
              Worcester. The project involved gauging the level of students' understanding of concepts they were
              expected to know, according to the state education system, and then creating interactive activities
              targeted at the scientific concepts that were lacking. Our funding for creating the activities came from
              the American Institute of Aeronautics and Astronautics (AIAA), who only asked that we tailor our
              activities to aeronautics-related themes.
            </p>
          </div>
        </div>

        {/* 02 Development */}
        <div className="row">
          <div className="col-lg-3 col-md-2 d-none d-md-block">
            <h2 className="text-danger text-right">02</h2>
          </div>
          <div className="col-lg-6 col-md-8">
            <h2>
              <span className="text-danger d-md-none">02&ensp;</span>Development
            </h2>

            <p>
              We began by creating six short quizzes for each subject covered by the fifth-grade MCAS exams and
              distributing them to the sixth graders. The results of these quizzes allowed us to locate the major lapses
              in learning in three of those subjects, so we began creating activities specifically tailored to Energy,
              Forces and Motion, and Sound and Light. I designed the worksheets for these activities.
            </p>
            <p>
              For the Energy activity, I devised and constructed three ramps and "moon craters" from acrylic to make the
              activity interactive. The students learned on their own that the height from which they rolled a Hotwheels
              car down the ramp affected the speed of the car when it reached the crater, and we found that the
              students' understanding persisted, at least throughout the rest of the year.
            </p>
          </div>
        </div>

        <Image
          src="/img/iqp-ramp.jpg"
          caption="The final ramps made of laser-cut acrylic used in the sixth grade classrooms."
          title="The final ramps made of laser-cut acrylic."
        />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              Next, we again used the ramps in studying friction forces in the Forces and Motion activity we designed.
              We also introduced a Hotwheels set where cars went around a loop upside down to exemplify centripetal
              force.
            </p>
          </div>
        </div>

        <Image
          src="/img/iqp-hotwheels.jpg"
          caption="Using a Hotwheels track to demonstrate centripetal force to the students."
          title="My teammates and me showing students a Hotwheels track."
        />

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              Near the end of our project, we took the students on a field trip to Tower Hill Botanical Gardens to
              support their Biology unit. At the very end, we gave the students another short quiz to see how much the
              students were retaining information from the activities we did, and we were happy to find that they seemed
              to peform better in the subjects we had targeted initially.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <p>
              Near the end of our project, we took the students on a field trip to Tower Hill Botanical Gardens to
              support their Biology unit. At the very end, we gave the students another short quiz to see how much the
              students were retaining information from the activities we did, and we were happy to find that they seemed
              to peform better in the subjects we had targeted initially.
            </p>
          </div>
        </div>

        {/* Final Report */}
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <hr />
            <h3>Final Report</h3>
            <a
              target="_blank"
              href="https://www.wpi.edu/Pubs/E-project/Available/E-project-031614-233410/unrestricted/Final_Report.pdf"
            >
              Find a copy of our 138-page final report here.
            </a>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
