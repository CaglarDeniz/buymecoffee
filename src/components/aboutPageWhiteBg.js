import "./aboutPageWhiteBg.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AboutPageWhiteBg() {
  const navigate = useNavigate();

  return (
    <div className="white-container">
      <h2>Every coffee can lead to an investment opportunity.</h2>
      <h2>Sign Up to BuyMeCoffee Now</h2>
      <div className="button-container">
      <Button className="buttons" variant="contained"     onClick={() => {
            navigate("/login");
          }}>
        LogIn
      </Button>
      <Button className="buttons" sx={{ color: "#FFFFFF" }} variant="outlined"
              onClick={() => {
                navigate("/signup");
              }}>
        SignUp
      </Button>
      </div>
    </div>
  );
}

export default AboutPageWhiteBg;
