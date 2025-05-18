import { projects } from "@/data/projects";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import indexBanner from "@/assets/img/index-banner.jpg";

export const metadata = {
  title: "Prateek Sahay",
};

export default function Home() {
  return (
    <>
      <div
        className="full-height jumbotron-main"
        style={{ backgroundSize: "cover", backgroundImage: `url(${indexBanner.src})` }}
      >
        <div className="container">
          <div className="subtitle-center subtitle-above">Design</div>

          <div className="subtitle-center subtitle-middle">Prateek Sahay</div>

          <div className="subtitle-center subtitle-below">Engineering</div>

          <a href="#portfolio" style={{ color: "white" }} title="Portfolio">
            <div className="nav-icon">
              <FontAwesomeIcon icon={faChevronDown} transform="up-1" />
            </div>
          </a>
        </div>
      </div>

      {/* Image for social media sites like LinkedIn to use as a thumbnail */}
      <Image src={indexBanner} className="d-none" alt="" placeholder="blur" />

      {/* Portfolio */}
      <div className="container">
        <div className="row">
          <a name="portfolio"></a>
          <div className="col-12">
            <h2 className="panel-title">Portfolio</h2>
          </div>
        </div>

        <div className="row">
          {projects
            .filter((project) => project.show)
            .map((project, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <Link href={`/portfolio/${project.slug}`}>
                  <div
                    className="project-thumbnail"
                    style={{ backgroundImage: `url(${project.thumbnailImg.src})` }}
                  ></div>
                </Link>
                <p className="project-thumbnail-caption">
                  <span className="text-danger">{String(index + 1).padStart(2, "0")}</span> {project.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
