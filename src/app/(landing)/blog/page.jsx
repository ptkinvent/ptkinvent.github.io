import { blogs } from "@/data/blogs";
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", marginTop: "20px", marginBottom: "20px" }} />
          <img src="/img/uber-krypton.jpg" className="header-img" />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <h2 className="about-intro">
            <span className="text-danger">Welcome.</span> This is my blog.
          </h2>
          <p>
            I got started in software later than many of my friends, so I can appreciate just how steep the learning
            curve can be. My hope for this blog is to ease the journey for others&mdash;and to teach myself just how
            much more I have to learn!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10">
          <h3 className="panel-subtitle">Posts</h3>

          {blogs
            .filter((blog) => blog.show)
            .map((blog) => (
              <div key={blog.id} className="card w-100 mb-4">
                {/* Post preview image */}
                <Link href={`/blog/${blog.id}`}>
                  <img className="card-img-top" src={blog.bannerImg} alt="Card image cap" />
                </Link>
                {/* Post preview body */}
                <div className="card-body">
                  <Link href={`/blog/${blog.id}`}>
                    <h5 className="card-title mb-2">{blog.title}</h5>
                  </Link>
                  <h6 className="card-subtitle text-danger mb-2">
                    <small>{blog.date}</small>
                  </h6>
                  <p className="card-text">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.id}`} className="btn btn-outline-primary">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
