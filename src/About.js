import AboutPageDarkBg from "./components/aboutPageDarkBg";
import AboutPageWhiteBg from "./components/aboutPageWhiteBg";
import AboutPageBlueBg from "./components/aboutPageBlueBg";
import "./components/about.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="navbar">
        <img
          className="bmcf-home"
          src={require("./components/img/BuyMeCoffeeNew.png")}
          alt="BuyMeCoffeeLogo"
          onClick={() => {
            navigate("/");
          }}
        />
        <Button
          className="button"
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          LogIn
        </Button>
        <Button
          className="button"
          sx={{ color: "#FFFFFF" }}
          variant="outlined"
          onClick={() => {
            navigate("/signup");
          }}
        >
          SignUp
        </Button>
      </div>
      <video className="video" width="100%" controls>
        <source
          src={require("./components/img/bmcfVideo.mp4")}
          type="video/mp4"
        ></source>
      </video>
      <AboutPageBlueBg />
      <AboutPageDarkBg />
      <AboutPageWhiteBg />

    </div>
  );
}

export default About;
