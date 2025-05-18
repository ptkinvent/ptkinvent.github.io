export default function ResponsiveCaption({ children, caption }) {
  return (
    <div className="row image">
      <div className="offset-xl-1 col-lg-2 d-none d-lg-block image-caption">
        <p>{caption}</p>
      </div>
      <div className="col-xl-6 col-lg-8">
        {children}
        <p className="image-caption-sm d-lg-none">{caption}</p>
      </div>
    </div>
  );
}
