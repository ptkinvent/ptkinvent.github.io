"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Masonry } from "masonic";
import photographyAc from "@/assets/img/photography-ac.jpg";
import photographyPrSwing from "@/assets/img/photography-pr-swing.jpg";
import photographyPrTrees from "@/assets/img/photography-pr-trees.jpg";
import photographyToeRings from "@/assets/img/photography-toe-rings.jpg";
import photographyWvRailway from "@/assets/img/photography-wv-railway.jpg";
import photographyWv from "@/assets/img/photography-wv.jpg";
import photographyAcGame from "@/assets/img/photography-ac-game.jpg";
import photographyDcMonument from "@/assets/img/photography-dc-monument.jpg";
import photographyLuraySidewalk from "@/assets/img/photography-luray-sidewalk.jpg";
import photographyMchenryOverhead from "@/assets/img/photography-mchenry-overhead.jpg";
import photographyMchenry from "@/assets/img/photography-mchenry.jpg";
import photographyMehndi from "@/assets/img/photography-mehndi.jpg";
import photographyPhilly from "@/assets/img/photography-philly.jpg";
import photographyRestonIce from "@/assets/img/photography-reston-ice.jpg";
import photographyRestonOverhead from "@/assets/img/photography-reston-overhead.jpg";

function PhotoModal({ selectedPhoto }) {
  return (
    <div className="modal fade" id="modal" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <div className="flex flex-col gap-4">
              <h5 className="modal-title">{selectedPhoto?.caption}</h5>
              <h6 className="text-muted">{selectedPhoto?.dateTaken}</h6>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-center">
            {selectedPhoto && (
              <Image
                src={selectedPhoto.src}
                className="card-img"
                alt={selectedPhoto?.caption}
                placeholder="blur"
                style={{
                  maxHeight: "80vh",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MasonryItem({ index, data, width }) {
  return (
    <>
      {/* Clickable images for larger screens */}
      <div className="card d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#modal">
        <Image
          src={data.src}
          className="card-img h-auto"
          alt={data.caption}
          placeholder="blur"
          onClick={() => data.setSelectedPhoto(data)}
          style={{ cursor: "zoom-in" }}
        />
      </div>

      {/* Captioned images for smaller screens */}
      <div className="card d-sm-none">
        <Image src={data.src} className="card-img-top h-auto" alt={data.caption} placeholder="blur" />
        <div className="card-body">
          <h5 className="card-title">{data.caption}</h5>
          <p className="card-text">{data.dateTaken}</p>
        </div>
      </div>
    </>
  );
}

export default function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const items = [
    { src: photographyAc, dateTaken: "07/06/2025", caption: "Atlantic City, NJ" },
    { src: photographyAcGame, dateTaken: "07/06/2025", caption: "A different kind of gambling in Atlantic City, NJ" },
    { src: photographyPhilly, dateTaken: "07/05/2025", caption: "Cherry Street Pier, Philadelphia, PA" },
    { src: photographyWv, dateTaken: "05/03/2025", caption: "Harper's Ferry, WV" },
    {
      src: photographyWvRailway,
      dateTaken: "05/03/2025",
      caption: "Harper's Ferry, WV",
    },
    { src: photographyPrTrees, dateTaken: "04/20/2025", caption: "Puerto Rico" },
    {
      src: photographyPrSwing,
      dateTaken: "04/21/2025",
      caption: "Vieques, Puerto Rico",
    },
    { src: photographyLuraySidewalk, dateTaken: "04/05/2025", caption: "Luray Caverns, VA" },
    { src: photographyDcMonument, dateTaken: "03/29/2025", caption: "Cherry blossoms in Washington, DC" },
    { src: photographyToeRings, dateTaken: "02/21/2025", caption: "New Delhi, India" },
    { src: photographyMehndi, dateTaken: "02/21/2025", caption: "Henna tattoos in New Delhi, India" },
    { src: photographyRestonIce, dateTaken: "01/06/2025", caption: "A frozen pond in Reston, VA" },
    { src: photographyMchenryOverhead, dateTaken: "11/09/2024", caption: "Fort McHenry from above" },
    { src: photographyMchenry, dateTaken: "11/09/2024", caption: "Fort McHenry, MD" },
    { src: photographyRestonOverhead, dateTaken: "10/24/2024", caption: "Autumn in Reston, VA" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-4">
        <Masonry
          items={items.map((item) => ({ ...item, selectedPhoto, setSelectedPhoto }))}
          render={MasonryItem}
          maxColumnCount={3}
          columnGutter={16}
        />
      </div>
      <PhotoModal selectedPhoto={selectedPhoto} />
    </>
  );
}
