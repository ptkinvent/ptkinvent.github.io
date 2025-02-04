import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata = {
  title: "Prateek Sahay",
};

export default function Home() {
  return (
    <>
      <div
        className="full-height jumbotron-main"
        style={{ backgroundSize: "cover", backgroundImage: "url('/img/index-banner.jpg')" }}
      >
        <div className="container">
          <div className="subtitle-center subtitle-above">
            <p>Design</p>
          </div>

          <div className="subtitle-center subtitle-middle">
            <p>Prateek Sahay</p>
          </div>

          <div className="subtitle-center subtitle-below">
            <p>Engineering</p>
          </div>

          <a href="#portfolio" style={{ color: "white" }} title="Portfolio">
            <div className="nav-icon">
              <i className="fas fa-chevron-down" data-fa-transform="up-1"></i>
            </div>
          </a>
        </div>
      </div>

      {/* Image for social media sites like LinkedIn to use as a thumbnail */}
      <img src="/img/index-banner.jpg" className="d-none" alt="" />

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
                <Link href={`/projects/${project.id}`}>
                  <div className="project-thumbnail" style={{ backgroundImage: `url(${project.thumbnailImg})` }}></div>
                </Link>
                <p className="thumbnail-caption">
                  <span className="text-danger">{String(index + 1).padStart(2, "0")}</span> {project.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
