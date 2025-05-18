export default function Video({ src, title, caption }) {
  return (
    <div className="row">
      <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
        <hr />
        <h3>{title}</h3>
        <div className="video">
          {src.includes("vimeo") ? (
            <iframe src={src} width="100%" height="auto" frameBorder="0" allowFullScreen></iframe>
          ) : (
            <iframe src={src} className="embed-responsive-item" allowFullScreen></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
