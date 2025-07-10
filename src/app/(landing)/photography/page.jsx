import PhotoGrid from "@/components/photogrid";
import Image from "next/image";
import photographyBanner from "@/assets/img/photography-banner.jpg";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photography",
};

export default function PhotographyPage() {
  return (
    <>
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
          <hr style={{ width: "200px", margin: "20px auto" }} />
          <Image src={photographyBanner} className="w-100 h-auto" alt="" placeholder="blur" />
          <h2 className="landing-header">
            <span className="text-danger">Take.</span> These are some photos I've taken.
          </h2>
          <p>
            I enjoy taking photos to preserve the beauty of everyday moments, and I love sharing my photos with friends
            outside of social media.
          </p>
          <p className="text-primary-emphasis">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <PhotoGrid />
    </>
  );
}
