export default function ResponsiveHeading({ numbering, width = 6, children }) {
  return (
    <div className="row">
      <div className={`${width === 8 ? "col-lg-2" : "col-xl-3 col-lg-2"} d-none d-lg-block`}>
        <h2 className="text-danger text-end">{numbering}</h2>
      </div>
      <div className={`${width === 8 ? "col-lg-8" : "col-xl-6 col-lg-8"}`}>
        <h2>
          <span className="text-danger d-lg-none">{numbering}&ensp;</span> {children}
        </h2>
      </div>
    </div>
  );
}
