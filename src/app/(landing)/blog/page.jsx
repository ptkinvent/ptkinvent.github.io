import { blogs } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
import uberKrypton from "@/assets/img/uber-krypton.jpg";

export const metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />
          <Image src={uberKrypton} className="w-100 h-auto" alt="" placeholder="blur" />
          <h2 className="landing-header">
            <span className="text-danger">Welcome.</span> This is my blog.
          </h2>
          <p>
            I got started in software later than many of my friends, and I can appreciate just how steep the learning
            curve can be. My hope for this blog is to ease the journey for others&mdash;and to remind myself just how
            much more I have to learn!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <h3 className="panel-subtitle">Posts</h3>

          <div className="row">
            {blogs
              .filter((blog) => blog.show)
              .map((blog) => (
                <div key={blog.slug} className="col-12">
                  <div className="card mb-4">
                    {/* Post preview image */}
                    <Link href={`/blog/${blog.slug}`}>
                      <Image className="card-img-top h-auto" src={blog.bannerImg} alt="" placeholder="blur" />
                    </Link>
                    {/* Post preview body */}
                    <div className="card-body">
                      <Link href={`/blog/${blog.slug}`}>
                        <h5 className="card-title mb-2">{blog.title}</h5>
                      </Link>
                      <h6 className="card-subtitle text-danger mb-2">
                        <small>{blog.date}</small>
                      </h6>
                      <p className="card-text">{blog.excerpt}</p>
                      <Link href={`/blog/${blog.slug}`} className="btn btn-outline-secondary">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
