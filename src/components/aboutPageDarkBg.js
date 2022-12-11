import "./aboutPageDarkbg.css";

function AboutPageDarkBg() {
  return (
    <div
      className="dark-container"
      style={{ backgroundImage: `url(${require("./img/gradient.png")})` }}
    >
      <h1 className="tag-line">Connect in just two clicks</h1>
      <div className="container-flex">
        <div>
          <h2>Innovator View</h2>
          <img
          className="feature-pic"
            src={require("./img/innovatorView.png")}
            alt="Innovator Feature"
          />
        </div>
        <div>
          <h2>Investor View</h2>
          <img
          className="feature-pic"
            src={require("./img/investorView.png")}
            alt="Innovator Feature"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPageDarkBg;
