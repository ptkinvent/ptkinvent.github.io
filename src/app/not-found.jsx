function ErrorLayout({ title, detail, subtext, bannerImg, children }) {
  return (
    <div
      className="jumbotron page-header"
      style={{
        paddingTop: "10em",
        minHeight: "100%",
        backgroundImage: `url(${bannerImg})`,
        backgroundColor: "#4f4f4f",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginBottom: "-50px",
      }}
    >
      <div className="container">
        <h1 className="page-title">{title}</h1>
        <hr style={{ borderColor: "white", width: "200px" }} />
        <h4 className="page-subtitle">
          <em>{detail}</em>
        </h4>
        <h4 className="page-detail">{subtext}</h4>
        {children}
      </div>

      <div className="push" style={{ height: "5em" }}></div>
    </div>
  );
}

export default function NotFound() {
  return (
    <ErrorLayout
      title="404"
      detail="Page not found"
      subtext="It's a feature, not a bug"
      bannerImg="/img/error-architecture.png"
    />
  );
}
