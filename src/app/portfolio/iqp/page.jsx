import { projects } from "@/data/projects";
import ResponsiveCaption from "@/components/responsive-caption";
import ResponsiveHeading from "@/components/responsive-heading";
import Image from "next/image";
import iqpRamp from "@/assets/img/iqp-ramp.jpg";
import iqpHotwheels from "@/assets/img/iqp-hotwheels.jpg";

export async function generateMetadata() {
  const project = projects.find((project) => project.slug === "iqp");

  return {
    title: project.title,
  };
}

export default function IQP() {
  return (
    <>
      <div className="container">
        {/* 01 Background */}
        <ResponsiveHeading numbering="01">Background</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
        <ResponsiveHeading numbering="02">Development</ResponsiveHeading>
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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

        <ResponsiveCaption caption="The final ramps made of laser-cut acrylic used in the sixth grade classrooms.">
          <Image
            src={iqpRamp}
            className="w-100 h-auto"
            alt="The final ramps made of laser-cut acrylic."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Next, we again used the ramps in studying friction forces in the Forces and Motion activity we designed.
              We also introduced a Hotwheels set where cars went around a loop upside down to exemplify centripetal
              force.
            </p>
          </div>
        </div>

        <ResponsiveCaption caption="Using a Hotwheels track to demonstrate centripetal force to the students.">
          <Image
            src={iqpHotwheels}
            className="w-100 h-auto"
            alt="My teammates and me showing students a Hotwheels track."
            placeholder="blur"
          />
        </ResponsiveCaption>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
            <p>
              Near the end of our project, we took the students on a field trip to Tower Hill Botanical Gardens to
              support their Biology unit. At the very end, we gave the students another short quiz to see how much the
              students were retaining information from the activities we did, and we were happy to find that they seemed
              to peform better in the subjects we had targeted initially.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
          <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
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
