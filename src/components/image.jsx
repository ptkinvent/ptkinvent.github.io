export default function Image({ src, title, caption, width = 6 }) {
  return (
    <div className="row image">
      <div className={`${width == 8 ? "" : "offset-lg-1"} col-lg-2 d-none d-lg-block image-caption`}>
        <p>{caption}</p>
      </div>
      <div className={`col-lg-${width} col-md-8 offset-lg-0 offset-md-2`}>
        <img src={src} title={title} alt={title} />
        <p className="image-caption-sm d-lg-none">{caption}</p>
      </div>
    </div>
  );
}
