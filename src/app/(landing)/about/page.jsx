import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import aboutBanner from "@/assets/img/about-banner.jpg";

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />
          <Image src={aboutBanner} className="w-100 h-auto" alt="" placeholder="blur" />
          <h2 className="landing-header">
            <span className="text-danger">Hi.</span> My name is Prateek Sahay.
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="offset-xl-3 col-xl-4 offset-lg-2 col-lg-8">
          <article>
            <section>
              <p>
                I'm deeply passionate about robotics and entrepreneurship. I started my career after graduating from
                Worcester Polytechnic Institute (WPI), earning dual Bachelor's degrees in Robotics and Mechanical
                Engineering. My first job was at <Link href="/projects/sikorsky">Sikorsky Aircraft</Link> designing
                software for autonomous helicopters for the DARPA ALIAS program. Then, I went to{" "}
                <a
                  href="https://www.uber.com/us/en/atg/research-and-development/perception-and-prediction/"
                  target="_blank"
                >
                  Uber ATG
                </a>{" "}
                to design software for self-driving cars. From 2020-2022, I studied at UC Berkeley earning dual MBA/MEng
                degrees, after which I became a Product Manager working on self-driving cars at{" "}
                <a href="https://waymo.com" target="_blank">
                  Waymo
                </a>
                . Soon after, I founded a startup called{" "}
                <Link href="https://procurespark.ai" target="_blank">
                  ProcureSpark
                </Link>{" "}
                to accelerate the way companies apply for bids and proposals (RFPs) using AI.
              </p>
              <p>
                Outside of work, I enjoy giving back to the community through volunteer work; I've{" "}
                <Link href="/projects/frcsim">mentored for FIRST Robotics</Link>, volunteered at the Museum of Science
                in Boston, and done some graphic design work for{" "}
                <a href="http://www.essenceofindia.org/" target="_blank">
                  Essence of India
                </a>
                , an annual celebration of classical Indian culture and heritage in my hometown.
              </p>
              <p>
                In my free time, I practice badminton, photography, and woodworking. I've always thrived at the
                intersection of disciplined engineering and vibrant arts, so I'm especially drawn to environments where
                I can continue learning both.
              </p>
            </section>
            <section>
              <h3 className="panel-subtitle">About the Website</h3>
              <p>
                I designed the theme for this website on my own and coded it up using{" "}
                <a href="https://nextjs.org/" target="_blank">
                  Next.js
                </a>{" "}
                and{" "}
                <a href="http://getbootstrap.com/" target="_blank">
                  Twitter Bootstrap
                </a>
                . It was my first foray into HTML/CSS in 2011, and it's been a lot of fun. Thanks to the powers of
                Bootstrap, this website is fully optimized for your mobile display as well. Enjoy!
              </p>
            </section>
          </article>

          {/* Last updated */}
          <p className="text-danger">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Links */}
        <div className="offset-xl-0 col-xl-2 offset-lg-2 col-lg-8">
          <p className="text-primary-emphasis">
            <FontAwesomeIcon icon={faEnvelope} fixedWidth />
            &nbsp; <a href="mailto:ptkinvent@gmail.com">ptkinvent@gmail.com</a>
          </p>
          <p className="text-primary-emphasis">
            <b>
              <FontAwesomeIcon icon={faFilePdf} fixedWidth />
              &nbsp;{" "}
              <a href="/ResumePrateekSahay.pdf" target="_blank">
                Download my r&eacute;sum&eacute;
              </a>
            </b>
          </p>
        </div>
      </div>
    </>
  );
}
